var BackgroundSystem = function() {


  var ctx = document.getElementById("canvas").getContext("2d"),
      canvasTemp = document.createElement("canvas"),
      scrollImg = new Image(),
      tempContext = canvasTemp.getContext("2d"),
      imgWidth = 0,
      imgHeight =0,
      imageData = {},
      canvasWidth = 0.95 * window.innerWidth,
      canvasHeight = 0.9 * window.innerHeight,
      scrollVal = 0,
      speed =2;

  scrollImg.src = "./img/background.png";
  scrollImg.onload = loadImage;

  function loadImage(){
    imgWidth = scrollImg.width,
    imgHeight = scrollImg.height;
    canvasTemp.width = imgWidth;
    canvasTemp.height =  imgHeight;    
    render();                
  }

  function render(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    if(scrollVal >= canvasWidth){
      scrollVal = 0;
    }

    scrollVal+=speed;                   
    ctx.drawImage(scrollImg,canvasWidth-scrollVal,0,scrollVal,imgHeight, 0, 0, scrollVal,imgHeight);
    ctx.drawImage(scrollImg,scrollVal,0,imgWidth, imgHeight);


    setTimeout(function(){render();},10);
  }
};

exports.BackgroundSystem = BackgroundSystem;