
// 用于计算 fib 的 js 函数
function fib_js(item) {

    if (item == 0 || item == 1) {
        return 1
    }

    return fib_js(item - 1) + fib_js(item - 2)
}


// 使用 js 版 fib 函数计算并计时
function calc_js() {
    let val = document.getElementById('item_num').value;
    let start = new Date();
    let ret = fib_js(val);
    let end = new Date();
    let elasped = (end.getTime() - start.getTime()) / 1000.0;
    console.log('JavaScript 计算结果：', ret);
    console.log('JavaScript 耗时：', elasped);
    alert(ret + '\n' + elasped);
}


// 使用 go 版 fib 函数计算并计时
function calc_go() {
    let val = document.getElementById('item_num').value;
    let start = new Date();
    let ret = fib_go2(val * 1);
    let end = new Date();
    let elasped = (end.getTime() - start.getTime()) / 1000.0;
    console.log('Go WebAssembly 计算结果：', ret);
    console.log('Go WebAssembly 耗时：', elasped);
    alert(ret + '\n' + elasped);
}

// 使用 rust 版 fib 函数计算并计时（通过 fetch 方式加载）
function calc_rust_fetch() {
    let val = document.getElementById('item_num').value;
    let start = new Date();
    let ret = fib_rust_fetch(val);
    let end = new Date();
    let elasped = (end.getTime() - start.getTime()) / 1000.0;
    console.log('Rust WebAssembly 计算结果：', ret);
    console.log('Rust WebAssembly 耗时：', elasped);
    alert(ret + '\n' + elasped);
}

// 使用 rust 版 fib 函数计算并计时（通过 fetch 方式加载）
function calc_rust_xhr() {
    let val = document.getElementById('item_num').value;
    let start = new Date();
    let ret = fib_rust_xhr(val);
    let end = new Date();
    let elasped = (end.getTime() - start.getTime()) / 1000.0;
    console.log('Rust WebAssembly 计算结果：', ret);
    console.log('Rust WebAssembly 耗时：', elasped);
    alert(ret + '\n' + elasped);
}


// 初始化 go 编写的 wasm
const go = new Go();
WebAssembly.instantiateStreaming(fetch("wasm_go.wasm"), go.importObject)
    .then((result) => go.run(result.instance));


// 使用 fetch 初始化 rust 编写的 wasm
// 参考：Compiling Rust to WebAssembly: A Simple Example
// https://depth-first.com/articles/2020/06/29/compiling-rust-to-webassembly-a-simple-example/
(async () => {
    let response = await fetch('wasm_rust.wasm');
    let bytes = await response.arrayBuffer();
    let { instance } = await WebAssembly.instantiate(bytes, {});

    // console.log('The answer is: ', instance.exports.add_one(13));
    // 注册函数
    window.fib_rust_fetch = instance.exports.fib_rust;
})();

// 通过 XHR 获取 wasm
// 参考：Loading and running WebAssembly code
// https://developer.mozilla.org/en-US/docs/WebAssembly/Loading_and_running
(function () {
    request = new XMLHttpRequest();
    request.open('GET', 'wasm_rust.wasm');
    request.responseType = 'arraybuffer';
    request.send();

    request.onload = function () {
        var bytes = request.response;
        WebAssembly.instantiate(bytes, {}).then(results => {
            // results.instance.exports.exported_func();
            window.fib_rust_xhr = results.instance.exports.fib_rust;
        });
    };
})();