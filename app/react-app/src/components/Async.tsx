import { delay } from "../lib/delay"

const Async = () => {
    console.log("5")
    wrap2()
    console.log("6") // delay()を待つことができない

    return(
        <>
            <p>Async</p>
        </>
    )
}

async function wrap1() {
    console.log("1")
    await delay(1000)
    console.log("2")
}

async function wrap2() {
    console.log("3")
    await wrap1()
    console.log("4") // これがdelayを待つにはwrap1()をawaitする必要がある
}

export default Async