import { useState } from "react";

    
    function Counter(){
        const [count, setCount] = useState(1);

        const add = () => setCount(count + 1);
        const reset = () => setCount(1);

        return (
            <>
            <button onClick={add}>Add</button>
            <button onClick={reset}>Reset</button>
               <p>{count}</p>
            </>
        )
    }

    export default Counter
