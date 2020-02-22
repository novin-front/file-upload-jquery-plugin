(function($){
    $.fn.fileUplodPlugins = function(option){
        let settings = $.extend({
            inputFileUpload: "#fileId",
            ValidType: ['image/jpeg', 'image/gif', 'image/svg+xml', 'image/png', 'application/pdf', 'text/plain'],
            btnUpload: ".loader-title__btn",
            deleteImageBtn: ".image-previwe__delete-btn"
        },option)
        let boxFileUpload = document.querySelector('.image-previwe');
        let errorWrapper = document.querySelector('.error-wrapper');
        let allData = []
        let ValidType = ['image/jpeg', 'image/gif', 'image/svg+xml', 'image/png', 'application/pdf', 'text/plain']

        function removeElement(id) {

            allData = allData.filter(itme => {
                return itme.id != id
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
            const createError = () => {
                let div = document.createElement('div');
                div.setAttribute("class", 'error-format');
                div.innerHTML = "File Format Is Not Valid";
                return div;
            }
            let checkTypeFiles = (file) => {
                let validation = {
                    isValid: false,
                    preViwe: null,
                }
                ValidType.forEach(data => {
                    console.log("checkTypeFiles", file, file.type == data)
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
                inputValue.map(itme => {
                    let isElementVaild = checkTypeFiles(itme)
                    if (isElementVaild.isValid) {
                        allData.push({
                            id: itme.lastModified,
                            file: itme
                        });
                    }
                });

                if (input.files.length) {
                    inputValue.forEach(element => {
                        let isElementVaild = checkTypeFiles(element)
                        console.log("isElementVaild object ===>", isElementVaild)
                        if (isElementVaild.isValid) {
                            renderImageData(isElementVaild.preViwe);
                        } else {
                            errorWrapper.appendChild(createError());
                            setTimeout(() => {
                                $('.error-format').fadeOut("slow")
                            }, 2500);
                        }
                    });
                }
            }

            function DragAndDropUpload(input) {
                let inputValue = Object.values(input)
                inputValue.map(itme => {
                    let isElementVaild = checkTypeFiles(itme)
                    if (isElementVaild.isValid) {
                        allData.push({
                            id: itme.lastModified,
                            file: itme
                        });
                    }
                });
                if (input.length) {
                    inputValue.forEach((element) => {
                        let isElementVaild = checkTypeFiles(element)
                        console.log("isElementVaild object ===>", isElementVaild)
                        if (isElementVaild.isValid) {
                            renderImageData(isElementVaild.preViwe);
                        } else {
                            errorWrapper.appendChild(createError());
                        }
                    });
                }
            }

            function renderImageData(arrayItme) {
                var reader = new FileReader();
                console.log("renderImageData ====>", arrayItme.hasOwnProperty("previewimg"))
                reader.onload = function (e) {
                    let previweTag = CreatImagePreview(e.target.result, arrayItme.lastModified, arrayItme.previewimg);
                    boxFileUpload.appendChild(previweTag);
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
                console.log("fffffffff", file)
                DragAndDropUpload(file)
            });
        })
        $(settings.btnUpload).click(function () {
            console.log("this is all image ===> ", allData);
        })
        $(document).on('click', settings.deleteImageBtn, function () {
            let dataId = $(this).attr("data-id")
            removeElement(dataId);
            $(this).parent().remove()
        });
        return this;
 
    }
}(jQuery))