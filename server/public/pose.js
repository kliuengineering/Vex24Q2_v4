/************************************** SETUP BEGINS ***************************************/

// capturing vedeo
const video5 = document.getElementsByClassName('input_video5')[0];

// video rendering
const out5 = document.getElementsByClassName('output5')[0];

// for user input and setting
const controlsElement5 = document.getElementsByClassName('control5')[0];

// draws pose landmarks
const canvasCtx5 = out5.getContext('2d');

// controls the rendering fps
const fpsControl = new FPS();

// loading spinning animation
const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => 
{
  spinner.style.display = 'none';
};

// utility -> generate color based on 'z' depth axis
function zColor(data) 
{
  const z = clamp(data.from.z + 0.5, 0, 1);
  return `rgba(0, ${255 * z}, ${255 * (1 - z)}, 1)`;
}

/************************************** SETUP ENDS *****************************************/





/************************************** GLOBAL VARIABLES BEGINS ****************************/

let action = 0; // agent action
const updateFrequency = 500; // 2 updates/second

// declaration of the positional variables
let leftArmAngle = 0;
let rightArmAngle = 0;
let leftShoulder = 0
let rightShoulder = 0;
let leftNode1 = 0;
let rightNode1 = 0;

/************************************** GLOBAL VARIABLES ENDS ******************************/





/************************************** MATH BEGINS ****************************************/



function calculateAngle(pointA, pointB, pointC)
{
  let ba = { x: pointA.x - pointB.x,     y: pointA.y - pointB.y};
  let bc = { x: pointC.x - pointB.x,     y: pointC.y - pointB.y};

  let dotProduct = ba.x * bc.x + ba.y * bc.y;
  let magnitudeBA = Math.sqrt(ba.x * ba.x + ba.y * ba.y);
  let magnitudeBC = Math.sqrt(bc.x * bc.x + bc.y * bc.y);

  let cosineAngle = dotProduct / (magnitudeBA * magnitudeBC);

  // angle calculations
  let theta = Math.acos(cosineAngle) * (180 / Math.PI);

  if ( pointA.y - pointB.y < 0 )
  {
    theta += 180;
  }

  rc = theta;
  return rc;
}

/************************************** MATH ENDS ******************************************/





/************************************** POSE DETECTION BEGINS ******************************/

// pose detection logic
function onResultsPose(results) 
{
  document.body.classList.add('loaded');
  fpsControl.tick();

  canvasCtx5.save();
  canvasCtx5.clearRect(0, 0, out5.width, out5.height);
  canvasCtx5.drawImage(results.image, 0, 0, out5.width, out5.height);

  // connects landmarks
  drawConnectors
  (
      canvasCtx5, results.poseLandmarks, POSE_CONNECTIONS, 
      {
        color: (data) => 
        {
          const x0 = out5.width * data.from.x;
          const y0 = out5.height * data.from.y;
          const x1 = out5.width * data.to.x;
          const y1 = out5.height * data.to.y;

          const z0 = clamp(data.from.z + 0.5, 0, 1);
          const z1 = clamp(data.to.z + 0.5, 0, 1);

          // colour gradient changes based on z axis
          const gradient = canvasCtx5.createLinearGradient(x0, y0, x1, y1);
          gradient.addColorStop( 0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)` );
          gradient.addColorStop( 1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)` );

          return gradient;
        }
      }
  );


  // calculates the angle between 3 points
  if (results.poseLandmarks) 
  {
    // implements 4 landmarks vector calculation
     leftShoulder = results.poseLandmarks[11];
     rightShoulder = results.poseLandmarks[12];
     leftNode1 = results.poseLandmarks[15];
     rightNode1 = results.poseLandmarks[16];

    // Calculate angles
    leftArmAngle = calculateAngle(leftNode1, leftShoulder, rightShoulder);
    rightArmAngle = calculateAngle(rightNode1, rightShoulder, leftShoulder);

    // Determine the action based on arm angles

    // case 1 -> robot turns <left>
    if (leftArmAngle > 140 && rightArmAngle < 70) 
    {
      action = 1;
    }
    
    // case 2 -> robot turns <right>
    else if (rightArmAngle > 140 && leftArmAngle < 70) 
    {
      action = 2;
    }
    
    // case 3 -> robot proceeds <forward>
    else if ( (leftArmAngle > 140 && leftArmAngle < 230) && (rightArmAngle > 140 && rightArmAngle < 230) ) 
    {
      action = 3;
    } 

    // case 4 -> robot retreats <backward>
    else if ( (leftArmAngle >= 230 && leftArmAngle < 270) && (rightArmAngle >= 230 && rightArmAngle < 270) ) 
    {
      action = 4;
    }
    
    // base case -> robot <stops>
    else 
    {
      action = 0;
    }    

    sendMessage(action);
  }


  // draws land marks, indicates different body parts
  drawLandmarks
  (
      canvasCtx5,
      Object.values(POSE_LANDMARKS_LEFT).map(index => results.poseLandmarks[index]),
      {color: zColor, fillColor: '#FF0000'}
  );

  drawLandmarks
  (
      canvasCtx5,
      Object.values(POSE_LANDMARKS_RIGHT).map(index => results.poseLandmarks[index]),
      {color: zColor, fillColor: '#00FF00'}
  );

  drawLandmarks
  (
      canvasCtx5,
      Object.values(POSE_LANDMARKS_NEUTRAL).map(index => results.poseLandmarks[index]),
      {color: zColor, fillColor: '#AAAAAA'}
  );



  // displays data on the HTML page
  document.getElementById('actionValue').innerText = `Agent's current action is -> ${action}`;

  // document.getElementById('leftShoulderCoords').innerText = leftShoulder;
  // document.getElementById('leftWristCoords').innerText = leftWrist;
  // document.getElementById('rightShoulderCoords').innerText = rightShoulder;
  // document.getElementById('rightWristCoords').innerText = rightWrist;

  document.getElementById('leftArmAnglePrint').innerText = `Your left arm angle is -> ${leftArmAngle.toString()}`;
  document.getElementById('rightArmAnglePrint').innerText = `Your right arm angle is -> ${rightArmAngle.toString()}`;


  canvasCtx5.restore();
}


// mediapipe fetcher
const pose = new Pose
(
  {
    // mediapipe initialization
    locateFile: (file) => 
    {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
    }
  }
);
pose.onResults(onResultsPose);


// pose processing
const camera = new Camera
(
  video5, 
  {
    // callback -> sends the current pose to mediapipe
    onFrame: async () => 
    {
      await pose.send({image: video5});
    },
  width: 480, height: 480
});
camera.start();

/************************************** POSE DETECTION ENDS ********************************/





/************************************** CONTROL PANEL LOGIC BEGINS *************************/

// allows user control of pose detection parameters
new ControlPanel(controlsElement5, 
  {
      selfieMode: true,
      upperBodyOnly: false,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
  }
  )
  .add([
      new StaticText({title: 'MediaPipe Pose'}),
      fpsControl,
      new Toggle({title: 'Selfie Mode', field: 'selfieMode'}),
      new Toggle({title: 'Upper-body Only', field: 'upperBodyOnly'}),
      new Toggle({title: 'Smooth Landmarks', field: 'smoothLandmarks'}),
      new Slider({
        title: 'Min Detection Confidence',
        field: 'minDetectionConfidence',
        range: [0, 1],
        step: 0.01
      }),
      new Slider({
        title: 'Min Tracking Confidence',
        field: 'minTrackingConfidence',
        range: [0, 1],
        step: 0.01
      }),
    ])
    .on(options => {
      video5.classList.toggle('selfie', options.selfieMode);
      pose.setOptions(options);
    });

/************************************** CONTROL PANEL LOGIC ENDS ***************************/


function sendUDPData(hostname, port, message) {
  const client = dgram.createSocket('udp4');
  const messageBuffer = Buffer.from(message);

  client.send(messageBuffer, port, hostname, (err) => {
    if (err) {
      console.error('Failed to send message', err);
    } else {
      console.log(`Message sent to ${hostname}:${port}`);
    }
    client.close();
  });
}


function sendMessage(action) {
  fetch('/sendudp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      hostname: '10.33.1.104',
      port: 4210,
      message: action.toString()
    })
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch((error) => {
    console.error('Error:', error);
  });
}
