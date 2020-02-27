### file upload jquery plugin

- preview image before upload

- multi select file upload

- drag and drop file upload

- Very easy to delete and add files

- Select any text or image file and click on Upload button.

- possible set type file upload in setting

 [site details](http://file-uploader-jquery.myazdanpanah.com/ "site details")

How to use
-------------
#### Set up your HTML markup.

```html
<div class="loader">
            <div class="loader-title">
                <h4>File Upload</h4>
                <hr />
                <button class="loader-title__btn">
                    Upload Now
                </button>
            </div>
            <div class="box-fileupload">
                <input type="file" id="fileId" class="file-upload-input" name="files" multiple>
                <label for="fileId" class="file-upload-btn"></label>
                <p class="box-fileupload__lable">Drop files here to upload</p>
            </div>
            <div class="error-wrapper"></div>
            <div class="image-previwe"></div>
        </div>

```


#### Add style.css in your  `</head>` tag
```html
<link rel="stylesheet" href="assets/css/style.css">
```
#### Add jquery-3.4.1.min.js before your closing `</body> ` tag, after add app.js

```html
 <script src="assets/js/jquery-3.4.1.min.js"></script>
 <script src="assets/js/app.js"></script>
```

#### jQuery Code Sample　

```javascript
$(document).ready(function(){
  $('.your-class').fileUplodPlugins({
    setting-name: setting-value
  });
});
```



### plugin preview

![](https://github.com/novin-front/file-upload-jquery-plugin/blob/master/assets/img/file-screenshot.JPG)


![](https://github.com/novin-front/file-upload-jquery-plugin/blob/master/assets/img/file-screenshot-2.JPG)


#### When complete, your HTML should look something like:

```html
 <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <title>Document</title>
</head>

<body>
    <div class="maincontent">
        <div class="file-upload-wrapper">
            <div class="file-upload-wrapper-title">
                <h4>File Upload</h4>
                <hr />
                <button class="file-upload-wrapper-title__btn">
                    Upload Now
                </button>
            </div>
            <div class="box-fileupload">
                <input type="file" id="fileId" class="file-upload-input" name="files" multiple>
                <label for="fileId" class="file-upload-btn"></label>
                <p class="box-fileupload__lable">Drop files here to upload</p>
            </div>
            <div class="error-wrapper"></div>
            <div class="image-previwe"></div>
        </div>
    </div>
    <script src="assets/js/jquery-3.4.1.min.js"></script>
    <script src="assets/js/app.js"></script>
    <script>
	$(document).ready(function(){
  $('.your-class').fileUplodPlugins({
    setting-name: setting-value
  });
});
    </script>
</body>

</html>
```

#### Settings
                
1. input File Upload seletor
2. Valid Type
3. Button Upload submit
3. Define Or Change Erorr Message 
4. Define File Upload Max Size (KB)
                
----
#### Settings sample

```javascript
$(".your-selector").fileUplodPlugins({
           inputFileUpload: "#fileId",
            ValidType: ['image/jpeg', 'image/png',],
            fileSize: 500,
            btnUpload: ".file-upload-wrapper-title__btn",
            deleteImageBtn: ".image-previwe__delete-btn",
            boxFileUploadPreviwe: '.image-previwe',
            boxErrorPreviwe: '.error-wrapper',
            messageView: {
                typeValid: "File type not allowed",
                sizeValid: "File size not Valid"
            }
        })
});
```
----
### Sample Data Type
    ['image/jpeg', 'image/gif', 'image/svg+xml', 'image/png', 'application/pdf', 'text/plain'],`

----
### Sample File Size
    fileSize: 500, \\your Max file size for Exampel 500 KB
----
### Sample Error Message 
    messageView: {
                typeValid: "your error message",
                sizeValid: "your error message"
            }