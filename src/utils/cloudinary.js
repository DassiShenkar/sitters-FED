var cloud_name = 'sitters';
var preset_name = 'bnkscsbk';

if (cloud_name != '' && preset_name != '') $('#message').remove();

$.cloudinary.config({
  cloud_name: cloud_name
});

$('.upload_field').unsigned_cloudinary_upload(preset_name, {
  cloud_name: cloud_name
}, {
  multiple: true
}).bind('cloudinarydone', function(e, data) {

    var url = "https://res.cloudinary.com/sitters/image/upload/" + data.result.public_id;
      document.getElementById("pictureURL").value = url;
    $('.thumbnails').append($.cloudinary.image(data.result.public_id, {
      format: 'jpg',
      width: 150,
      height: 100,
      crop: 'thumb',
      gravity: 'face',
      effect: 'sharpen:300'
    }))
  }

).bind('cloudinaryprogress', function(e, data) {
  var percent = Math.round((data.loaded * 100.0) / data.total);
  $('.progress_bar').css('width', percent + '%');
  $('.progress_wrapper .text').text(percent + '%');
});
