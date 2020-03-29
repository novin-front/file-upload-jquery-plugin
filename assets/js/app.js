(function ($) {
    $.fn.fileUplodPlugins = function (option) {
        let allData = []
        let finalData = [];
        let settings = $.extend({
            inputFileUpload: "#fileId",
            ValidType: ['image/jpeg', 'image/png', ],
            fileSize:500,//max size file is 500 kB
            btnUpload: ".file-upload-wrapper-title__btn",
            deleteImageBtn: ".image-previwe__delete-btn",
            boxFileUploadPreviwe: '.image-previwe',
            boxErrorPreviwe: '.error-wrapper',
            messageView: {
                typeValid: "File type not allowed",
                sizeValid: "File size not Valid"
            }
        }, option)
        

        function removeElement(id) {

            allData = allData.filter(itme => {
                return itme.id != id
            })
        }
        function removeImageBase64(name){
            finalData= finalData.filter(element => {
                if (element[name]){
                    delete element[name];
                    return null
                }
               
               return element
            })
        }
        $(document).ready(function () {
            const removeBtn = (id) => {
                let span = document.createElement('span');
                span.setAttribute('class', 'image-previwe__delete-btn');
                span.setAttribute('data-id', id);
                return span;
            }
            const previweNameImage = (name) => {
                let div = document.createElement('div');
                div.setAttribute('class', "image-previwe__hover");
                let p = document.createElement('p');
                p.innerHTML = name;
                div.appendChild(p)
                return div;
            }
            const CreatImagePreview = (image, id, noImage = null) => {
                let div = document.createElement('div');
                div.setAttribute("class", "image-previwe__image");
                if (noImage != null) {
                    div.setAttribute("style", `background-image:url(${noImage})`);
                } else {
                    div.setAttribute("style", `background-image:url(${image})`);
                }
                div.appendChild(removeBtn(id));
                div.appendChild(previweNameImage(id));
                return div;
            }
            const createError = (message) => {
                let div = document.createElement('div');
                div.setAttribute("class", 'error-format');
                div.innerHTML = message;
                return div;
            }
            function readImage(inputElement) {
                var deferred = $.Deferred();

                var files = inputElement.get(0).files;
                if (files && files[0]) {
                    var fr = new FileReader();
                    fr.onload = function (e) {
                        deferred.resolve(e.target.result);
                    };
                    fr.readAsDataURL(files[0]);
                } else {
                    deferred.resolve(undefined);
                }

                return deferred.promise();
            }
            // $("#fileId").on('change', function () {
            //     readImage($(this)).done(function (base64Data) {
            //         alert(base64Data);
            //     });
            // });
            let checkTypeFiles = (file) => {
                let validation = {
                    isValid: false,
                    preViwe: null,
                    fileSize: (file.size / 1024)
                }

                settings.ValidType.forEach((data, index) => {
                    if (file.type == data) {
                        file.previewimg = null;
                        validation.isValid = true;
                        validation.preViwe = file;
                        switch (true) {
                            case file.type == 'application/pdf':
                                file.previewimg = 'assets/img/pdf-icon.png'
                                validation.preViwe = file;
                                break;
                            case file.type == 'text/plain':
                                file.previewimg = 'assets/img/txt-icon.png';
                                validation.preViwe = file;
                                break;
                        }
                    }
                })

                return validation;
            }

            function uploadClick(input) {
                
                  
                let inputValue = Object.values(input.files)
                
                if (input.files.length) {
                    inputValue.forEach(element => {
                        let isElementVaild = checkTypeFiles(element)
                        switch (true) {
                            case !(isElementVaild.isValid):
                                $(settings.boxErrorPreviwe).append(createError(settings.messageView.typeValid));
                                break;
                            case isElementVaild.fileSize > settings.fileSize:
                                $(settings.boxErrorPreviwe).append(createError(settings.messageView.sizeValid));
                            break;
                        }
                        if (isElementVaild.isValid && isElementVaild.fileSize <= settings.fileSize) {
                            console.log("input.files", element.name);
                            readImage($(input)).done(function (base64Data) {
                                  finalData.push({
                                      [element.name] : base64Data,
                                  })
                            });
                            console.log("input.files", finalData);
                            allData.push({
                                id: element.lastModified,
                                file: element
                            });
                            renderImageData(isElementVaild.preViwe);
                        } 
                            setTimeout(() => {
                                $('.error-format').fadeOut("slow")
                            }, 2500);
                    
                    });
                }
            }

            function DragAndDropUpload(input) {
                let inputValue = Object.values(input)
                if (input.length) {
                    inputValue.forEach((element) => {
                        let isElementVaild = checkTypeFiles(element)
                        switch (true) {
                            case !(isElementVaild.isValid):
                                $(settings.boxErrorPreviwe).append(createError(settings.messageView.typeValid));
                                break;
                            case isElementVaild.fileSize > settings.fileSize:
                                $(settings.boxErrorPreviwe).append(createError(settings.messageView.sizeValid));
                                break;
                        }
                        if (isElementVaild.isValid && isElementVaild.fileSize <= settings.fileSize) {
                            allData.push({
                                id: element.lastModified,
                                file: element
                            });
                            renderImageData(isElementVaild.preViwe);
                        }
                        setTimeout(() => {
                            $('.error-format').fadeOut("slow")
                        }, 2500);
                    });
                }
            }

            function renderImageData(arrayItme) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    let previweTag = CreatImagePreview(e.target.result, arrayItme.lastModified, arrayItme.previewimg);
                    $(settings.boxFileUploadPreviwe).append(previweTag);
                }

                reader.readAsDataURL(arrayItme);
            };
            $(settings.inputFileUpload).change(function () {
                uploadClick(this);
            });

            $("html").on("dragover", function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
            $('.box-fileupload').on('dragenter', function (e) {
                e.stopPropagation();
                e.preventDefault();
                $(".box-fileupload__lable").text("Drop");
            });
            $('.box-fileupload').on('drop', function (e) {
                e.stopPropagation();
                e.preventDefault();

                $(".box-fileupload__lable").text("Upload");

                var file = e.originalEvent.dataTransfer.files;

                DragAndDropUpload(file)
            });
        })
        $(settings.btnUpload).click(function (e) {
            e.preventDefault();
            console.log("all file", finalData)
            return finalData;
        })
        $(document).on('click', settings.deleteImageBtn, function () {
            let dataId = $(this).attr("data-id");
            let fileName ;
            allData.forEach((element)=>{
                
                if(element.id == dataId){
                    
                    fileName = element.file.name
                }
            })

            console.log("get image name By id",allData,dataId,fileName)
            removeImageBase64(fileName);
            removeElement(dataId);
            $(this).parent().remove()
        });
        return this;

    }
}(jQuery))