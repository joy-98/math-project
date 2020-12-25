
        var pad;
        const base = window.location.host === "restfulmath.herokuapp.com" ? `https://restfulmath.herokuapp.com` :
            `http://127.0.0.1:5000`;



        let executiveOrder = {
            "MultiPartQuestion": showMultiPart,
            "MultiChoiceQuestion": showMultiChoice,
            "ShortAnswer": showShortAns,
            "Drawing": drawing,
            "True_False": true_false
        }


        function showMultiPart(divElement, res2) {
            divElement.html('')
            res2.parts.forEach((part, ix) => {
                console.log('hello', part.qtype)
                divElement.append(`<hr><p>part ${ix + 1}</p>`)
                divElement.append($(`<div id='${part.id}'></div>`))
                executiveOrder[part.qtype]($(`#${part.id}`), part, ix)

            });

        }

        function showMultiChoice(divElement, res2, index) {
            let img = `<img class="img-fluid" src="data:image/png;base64, ${res2.question_image}">`
            let help = `<div class="row" id="multiple-help-wrapper-${index}"></div>`
            let hint = `<div id=multiple-hint-wrapper class="col-md-6"><button class="btn">Hint</button> <iframe class="d-none" width="100%" src='${res2.hint}'></iframe></div>`
            let training = `<div id=multiple-training-wrapper class="col-md-6"><button class="btn">Training</button><iframe class="d-none" width="100%" src='${res2.training}'></iframe></div>`
            let p = `<p><span class="multiple">${res2.qtype}</span></p><p class="d-none">${Object.keys(res2)}</p>`
            let choices = `<div class="mb-4"><p class="text-center">Your answer: </p><div id="choices-${index}" class="d-flex justify-content-center choices-container"></div><div class="result-message my-3"></div></div>`

            divElement.html(p)
            divElement.append(img)
            options = ['A', 'B', 'C', 'D', 'E']
            let btns = ""

            for (let i = 0; i < res2.number_of_options; i++) {
                btns += `<a id="answer-${i}" class="_choice" onclick=success(${i === res2.answer_option})>${String.fromCharCode(65 + i)}</a>`
            }
            divElement.append(choices)
            $(`#choices-${index}`).append(btns)
            divElement.append(help)

            console.log($('#multiple-help-wrapper').parent)
            $(`#multiple-help-wrapper-${index}`).append(hint)
            $(`#multiple-help-wrapper-${index}`).append(training)

            $('#multiple-hint-wrapper').on('click', () => {
                $('#multiple-hint-wrapper iframe').removeClass('d-none')
            })
            $('#multiple-training-wrapper').on('click', () => {
                $('#multiple-training-wrapper iframe').removeClass('d-none')
            })

            console.log(res2.parts)

            $('._choice').on('click', (e) => {
                let targetElem = e.currentTarget.id
                let splitId = e.currentTarget.id.split('-')[1]

                $('._choice').removeClass('bg-danger')
                $('._choice').removeClass('bg-success')

                if (splitId === res2.answer_option.toString()) {
                    $(`#${targetElem}`).addClass('bg-success')
                }
                else {
                    $(`#${targetElem}`).addClass('bg-danger')
                }
            })


        }

        function showShortAns(divElement, res2, index) {
            console.log('index of short', index)
            let img = `<img class="img-fluid" src="data:image/png;base64, ${res2.question_image}">`
            let p = `<p><span class="short">${res2.qtype}</span><p class="d-none">${Object.keys(res2)}</p></p>`
            let help = `<div class="row" id="short-help-wrapper"></div>`
            let hint = `<div id=short-hint-wrapper class="col-md-6"><button class="btn">Hint</button> <iframe class="d-none" width="100%"  src=${res2.hint}></iframe> </div>`
            let training = `<div id="short-training-wrapper" class="col-md-6"><button class="btn">Training</button> <iframe class="d-none" width="100%"  src='${res2.training}'></iframe></div>`
            let ans_img = `<hr /><p><img class="img-fluid" src="data:image/png;base64, ${res2.answer_image}"></p>`

            divElement.html(p)
            divElement.append(img)
            divElement.append(ans_img)
            divElement.append(help)
            // divElement.append(hint)
            // divElement.append(training)
            $('#short-help-wrapper').append(hint)
            $('#short-help-wrapper').append(training)

            $('#short-hint-wrapper').on('click', () => {
                $('#short-hint-wrapper iframe').removeClass('d-none')
            })
            $('#short-training-wrapper').on('click', () => {
                $('#short-training-wrapper iframe').removeClass('d-none')
            })
        }


        function drawing(divElement, res2) {
            // let img = `<img class="img-fluid" src="data:image/png;base64, ${res2.question_image}">`
            let p = `<p><span class="draw">${res2.qtype}</span>
                    <p class="d-none">${Object.keys(res2)}</p></p>`
            let canvasParent = `
            <div class="bg-overlay"></div>
    <div class="container-fluid mt-5">


        <div class="row page">
            <div class="col-12 col-lg-3">
                <div class="tool-bar">
                    <div class="header">
                        <h3>Toolbar</h3>
                    </div>
                    <ul class="first-tool">
                        <li>
                            <button class="active" data-tool="pen">
                                <div class="icon">
                                    <i class="fas fa-pen"></i>
                                </div>
                                <div class="name">Pen</div>
                            </button>
                        </li>
                        <li>
                            <button data-tool="line">
                                <div class="icon">
                                    <i class="fas fa-arrows-alt"></i>
                                </div>
                                <div class="name">Line</div>
                            </button>
                        </li>
                        <li>
                            <button data-tool="square">
                                <div class="icon">
                                    <i class="fas fa-vector-square"></i>
                                </div>
                                <div class="name">Square</div>
                            </button>
                        </li>
                        <li>
                            <button data-tool="circle">
                                <div class="icon">
                                    <i class="fas fa-vector-circle"></i>
                                </div>
                                <div class="name">Circle</div>
                            </button>
                        </li>
                        <li>
                            <button data-tool="undo">
                                <div class="icon">
                                    <i class="fas fa-undo"></i>
                                </div>
                                <div class="name">Undo</div>
                            </button>
                        </li>
                    </ul>
                    <ul class="second-tool">
                        <li>
                            <div class="active" style="background-color: #000;" data-color="#000"></div>
                        </li>
                        <li>
                            <div style="background-color: #ff0000;" data-color="#ff0000"></div>
                        </li>
                        <li>
                            <div style="background-color: #ffd800;" data-color="#ffd800"></div>
                        </li>
                        <li>
                            <div style="background-color: #2196F3;" data-color="#2196F3"></div>
                        </li>
                        <li>
                            <div style="background-color: #fc6305;" data-color="#fc6305"></div>
                        </li>
                        <li>
                            <div style="background-color: #7bd235;" data-color="#7bd235"></div>
                        </li>
                    </ul>
                    <div class="third-tool">
                        <label>Size</label>
                        <select id="choose-line-width">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                   
                </div>
                
                    <button class="downloadImage btn mt-3" >Submit</button>
                
                
            </div>
            <div class="col-12  col-lg-9">
                <div class="content">

                    <div class="wrapper">
                        <div class="panel">
                            <canvas id="board"></canvas>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
            `
            let help = `<div class="row my-4" id="draw-help-wrapper"></div>`
            let hint = `<div id=draw-hint-wrapper class="col-md-6"><button class="btn">Hint</button> <iframe class="d-none" width="100%"  src=${res2.hint}></iframe> </div>`
            let training = `<div id="draw-training-wrapper" class="col-md-6"><button class="btn">Training</button> <iframe class="d-none" width="100%"  src='${res2.training}'></iframe></div>`
            // let downloadButton = `<a class="downloadImage" >Submit</a>`
            divElement.html(p)
            // divElement.append(img)
            divElement.append(canvasParent)
            divElement.append(help)
            // divElement.append(downloadButton)

            $('.downloadImage').on('click', () => {
                let img = document.querySelector('canvas').toDataURL('image/jpeg', 1.0)
                console.log(img)
            })

            class Paint {
                constructor() {
                    this.canvas = document.getElementById('board');
                    this.panel = {
                        width: document.querySelector('.panel').clientWidth - 30,
                        height: document.querySelector('.panel').clientHeight - 30,
                    };
                    this.pixelRatio = window.devicePixelRatio || 1;
                    this.canvas.width = this.panel.width;
                    this.canvas.height = this.panel.height;
                    this.context = this.canvas.getContext('2d');
                    this.strokeStyle = '#000';
                    this.drawBackground();
                    this.tool = 'pen';
                    this.images = null;
                    this.image = null;
                    this.history = [];
                    this.lineWidth = 1;
                    this.currentPos = {
                        x: 0,
                        y: 0
                    };
                    this.currentLinePos = {
                        x: 0,
                        y: 0
                    };
                    this.valid = false;
                    this.listenerEvent();
                    this.drawImageQuestion()
                }
                getMousePos(evt) {
                    let rect = this.canvas.getBoundingClientRect();
                    return {
                        x: evt.clientX - rect.left,
                        y: evt.clientY - rect.top
                    };
                }
                mouseDown() {
                    this.valid = true;
                    this.images = new Image();
                    this.images.src = this.canvas.toDataURL('image/bmp', 1.0);
                    this.history.push(this.images);

                    this.currentLinePos = this.getMousePos(event);

                    this.image = new Image();
                    this.image.src = this.canvas.toDataURL('image/bmp', 1.0);
                }
                mouseMove() {
                    let mousePos = this.getMousePos(event);
                    if (this.valid) {
                        switch (this.tool) {
                            case 'pen':
                                this.drawLine(this.currentPos, mousePos);
                                break;
                            case 'line':
                                this.resetLine();
                                this.drawLine(this.currentLinePos, mousePos);
                                break;
                            case 'square':
                                this.resetLine();
                                this.drawRect(this.currentLinePos, mousePos);
                                break;
                            case 'circle':
                                this.resetLine();
                                this.drawCircle(this.currentLinePos, mousePos);
                                break;
                        }

                    }
                    this.currentPos = mousePos;
                }
                mouseUp() {
                    this.valid = false;
                }
                getTouchPos(evt) {
                    var rect = this.canvas.getBoundingClientRect();
                    return {
                        x: evt.touches[0].clientX - rect.left,
                        y: evt.touches[0].clientY - rect.top
                    };
                }
                touchDown() {
                    let touchPos = this.getTouchPos(event);
                    this.currentPos = {
                        x: touchPos.x,
                        y: touchPos.y
                    };
                    this.currentLinePos = {
                        x: touchPos.x,
                        y: touchPos.y
                    };
                    this.valid = true;
                    this.images = new Image();
                    this.images.src = this.canvas.toDataURL('image/bmp', 1.0);
                    this.history.push(this.images);

                    this.image = new Image();
                    this.image.src = this.canvas.toDataURL('image/bmp', 1.0);
                }
                touchMove() {
                    let touchPos = this.getTouchPos(event);
                    if (this.valid) {
                        switch (this.tool) {
                            case 'pen':
                                this.drawLine(this.currentPos, touchPos);
                                break;
                            case 'line':
                                this.resetLine();
                                this.drawLine(this.currentLinePos, touchPos);
                                break;
                            case 'square':
                                this.resetLine();
                                this.drawRect(this.currentLinePos, touchPos);
                                break;
                            case 'circle':
                                this.resetLine();
                                this.drawCircle(this.currentLinePos, touchPos);
                                break;
                        }

                    }
                    this.currentPos = touchPos;
                }
                touchUp() {
                    this.valid = false;
                }


                drawImageQuestion() {
                    let base_image = new Image();
                    base_image.src = `data:image/png;base64, ${res2.question_image}`;
                    // base_image.src = 'https://images.unsplash.com/photo-1593642532009-6ba71e22f468?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                    base_image.onload = () => {
                        this.context.drawImage(base_image, 0, -250, this.canvas.width, this.canvas.height);
                    }
                }


                listenerEvent() {
                    this.canvas.addEventListener('mousedown', (event) => this.mouseDown(event));
                    this.canvas.addEventListener('mousemove', (event) => this.mouseMove(event));
                    this.canvas.addEventListener('mouseup', (event) => this.mouseUp(event));
                    this.canvas.addEventListener('touchstart', (event) => this.touchDown(event));
                    this.canvas.addEventListener('touchmove', (event) => this.touchMove(event));
                    this.canvas.addEventListener('touchend', (event) => this.touchUp(event));
                }






                resetLine() {
                    this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
                }

                undo() {
                    if (this.history.length > 0) {
                        let lastItem = this.history[this.history.length - 1];
                        this.context.drawImage(lastItem, 0, 0, this.canvas.width, this.canvas.height);
                        this.history.splice(this.history.length - 1, 1);
                    } else {
                        alert('Nothing to undo');
                    }
                }

                drawBackground() {
                    this.context.fillStyle = '#fff';
                    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
                }

                drawLine(startPos, endPos) {
                    this.context.lineWidth = this.lineWidth;
                    this.context.strokeStyle = this.strokeStyle;
                    this.context.beginPath();
                    this.context.moveTo(startPos.x, startPos.y);
                    this.context.lineTo(endPos.x, endPos.y);
                    this.context.stroke();
                }

                drawRect(startPos, endPos) {
                    this.context.lineWidth = this.lineWidth;
                    this.context.strokeStyle = this.strokeStyle;
                    this.context.beginPath();
                    this.context.rect(startPos.x, startPos.y, endPos.x - startPos.x, endPos.y - startPos.y);
                    this.context.stroke();
                }
                drawCircle(startPos, endPos) {
                    this.context.beginPath();
                    this.context.arc(startPos.x, startPos.y, (endPos.x - startPos.x), (startPos.y - endPos.y), 2 * Math.PI);
                    this.context.strokeStyle = this.strokeStyle;
                    this.context.lineWidth = this.lineWidth;
                    this.context.stroke();
                }
            }


            const board = new Paint();

            function changeTool(tool) {
                if (tool === 'undo') {
                    board.undo();
                } else {
                    board.tool = tool;
                    switch (board.tool) {
                        case 'pen':
                            board.canvas.style.cursor = 'crosshair';
                            break;
                        case 'line':
                            board.canvas.style.cursor = 'pointer';
                            break;
                    }
                }
            }

            function changeStrokeStyle(color) {
                board.strokeStyle = color;
            }

            function changeLineWidth(width) {
                board.lineWidth = width;
            }

            let btnTool = document.querySelectorAll('.first-tool button');
            btnTool.forEach((item, index) => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    let tool = item.getAttribute('data-tool');
                    if (tool !== 'undo') {
                        btnTool.forEach(button => {
                            button.classList.remove('active');
                        })
                        item.classList.add('active');
                    }
                    changeTool(tool);
                });
            });

            let btnColor = document.querySelectorAll('.second-tool div');
            btnColor.forEach((item, index) => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    let color = item.getAttribute('data-color');
                    btnColor.forEach(button => {
                        button.classList.remove('active');
                    })
                    item.classList.add('active');
                    changeStrokeStyle(color);
                });
            });

            document.querySelector('#choose-line-width').addEventListener('change', function () {
                changeLineWidth(this.value)
            });

            $('.nav-bar-toggle').click(function () {
                let toolbar = $('.tool-bar');
                let overlay = $('.bg-overlay');
                toolbar.toggleClass('active');
                if (toolbar.hasClass('active')) {
                    overlay.show();
                } else {
                    overlay.hide();
                }
            });
            $('.bg-overlay').click(function () {
                $('.tool-bar').removeClass('active');
                $(this).hide();
            });
            // var el = document.getElementById('sketchpad');
            // pad = new window.Sketchpad(el);

            // document.getElementById('line-color-input').oninput = setLineColor;
            // document.getElementById('line-size-input').oninput = setLineSize;
            // document.getElementById('undo').onclick = undo;
            // document.getElementById('redo').onclick = redo;
            // document.getElementById('clear').onclick = clear;
            // document.getElementById('downloadPng').addEventListener('click', downloadPng, false);
            // // pad.resize(500);
            // // resize
            // window.onresize = function (e) {
            //     pad.resize(el.offsetWidth);
            // }
            $('#draw-help-wrapper').append(hint)
            $('#draw-help-wrapper').append(training)

            $('#draw-hint-wrapper').on('click', () => {
                $('#draw-hint-wrapper iframe').removeClass('d-none')
            })
            $('#draw-training-wrapper').on('click', () => {
                $('#draw-training-wrapper iframe').removeClass('d-none')
            })

        }

        function true_false(divElement, res2, index) {
            let img = `<img class="img-fluid" src="data:image/png;base64, ${res2.question_image}">`
            let help = `<div class="row" id="trueFalse-help-wrapper-${index}"></div>`
            let hint = `<div id=trueFalse-hint-wrapper class="col-md-6"><button class="btn">Hint</button> <iframe class="d-none" width="100%" src='${res2.hint}'></iframe></div>`
            let training = `<div id=trueFalse-training-wrapper class="col-md-6"><button class="btn">Training</button><iframe class="d-none" width="100%" src='${res2.training}'></iframe></div>`
            let p = `<p><span class="multiple">${res2.qtype}</span></p><p class="d-none">${Object.keys(res2)}</p>`
            let choices = `<div class="mb-4"><p class="text-center">Your answer: </p><div id="choices-${index}" class="d-flex justify-content-center choices-container"></div><div class="result-message my-3"></div></div>`
            let btn0 = `<a id="answer-true-${index}" class="_choice p-4" onclick=success(${res2.answer === true})>True</a>`
            let btn1 = `<a id="answer-false-${index}" class="_choice p-4" onclick=success(${res2.answer === false})>False</a>`

            divElement.html(p)
            divElement.append(img)
            divElement.append(choices)
            $(`#choices-${index}`).append(btn0)
            $(`#choices-${index}`).append(btn1)
            divElement.append(help)

            console.log(res2.answer)
            $(`#trueFalse-help-wrapper-${index}`).append(hint)
            $(`#trueFalse-help-wrapper-${index}`).append(training)

            $('#trueFalse-hint-wrapper').on('click', () => {
                $('#trueFalse-hint-wrapper iframe').removeClass('d-none')
            })
            $('#trueFalse-training-wrapper').on('click', () => {
                $('#trueFalse-training-wrapper iframe').removeClass('d-none')
            })



            divElement.append(btns)
            divElement.append(hint)
            divElement.append(training)

            setTimeout(() => {
                $("a").on('click', () => {
                    console.log("yo")

                    // let splitId = e.currentTarget.id.split('-')[1]


                    // $('._choice').removeClass('bg-danger')
                    // $('._choice').removeClass('bg-success')

                    // if (splitId === "answer-true") {
                    //     $(`#${targetElem}`).addClass('bg-success')
                    // }
                    // else {
                    //     $(`#${targetElem}`).addClass('bg-danger')
                    // }
                })
            }, 2000);


        }


        function success(n) {
            if (n) {
                $('.result-message').find('p').remove()
                setTimeout(() => {
                    $('.result-message').append(`<p class="bg-success text-center p-3 w-50 m-auto">Correct answer</p>`)
                }, 100);

            }
            else {

                $('.result-message').find('p').remove()
                setTimeout(() => {
                    $('.result-message').append(`<p class="bg-danger text-center p-3 w-50 m-auto">Wrong answer</p>`)
                }, 100);

            }
        }

        async function getLibs() {
            const url = base + "/libraries";
            let res = await fetch(url);
            res = await res.json()
            // console.log(res)
            res.libs.forEach(lib => {
                let a =
                    `<a role="presentation" class="brand-nav py-4 px-2" data-id="${lib}" href="${base}" data-href="${base}/libraries?lib=${lib}" onclick="return false">${lib}</a>`
                $('#libs').append(a)
                $('#libs').find(`a[data-id="${lib}"]`).on('click', async e => {
                    let res1 = await fetch(e.target.dataset.href);
                    res1 = await res1.json()
                    console.log(res1)
                    $('#questions').html(``)
                    $('#question').html('')
                    if (!res1.questions) {
                        return
                    }

                    for (let i = 0; i < res1.questions.length; i++) {
                        let q = res1.questions[i]
                        let aq =
                            `<a role="presentation" class="brand-nav py-2 px-2" data-lib="${lib}" data-qid="${q}" href="#" data-href="${base}/libraries?lib=${lib}&qu=${q}" onclick="return false">${q}</a>`
                        $('#questions').append(aq)
                        $('#questions').find(`a[data-qid="${q}"]`).on('click', async e => {
                            let libId = e.target.dataset.lib
                            let qId = e.target.dataset.qid

                            let res2 = await fetch(
                                `${base}/libraries?lib=${libId}&qu=${qId}`);
                            res2 = await res2.json()
                            console.log(res2)
                            try {
                                if (res2.qtype) executiveOrder[res2.qtype]($(
                                    '#result'), res2, i)
                            } catch (err) {

                            }
                            if (res2 && res2.photo) {
                                let img =
                                    `<img class="img-fluid" src="data:image/png;base64, ${res2.photo}">`
                                $('#question').html(img)
                            }


                        })
                        $("#questions a").on("click", function () {
                            $("#questions ").find(".active").removeClass("active");
                            $(this).addClass("active");
                        });
                    }
                })

            });

            $("#libs a").on("click", function () {
                $("#libs ").find(".active").removeClass("active");
                $(this).addClass("active");
            });

        }
        getLibs();

