// src/lib.rs

#[no_mangle]
pub extern "C" fn fib_rust(n: u8) -> u32 {
    let ret: u32;
    if n == 0 || n == 1 {
        ret = 1;
    } else {
        ret = fib_rust(n - 1) + fib_rust(n - 2);
    }
    ret
}