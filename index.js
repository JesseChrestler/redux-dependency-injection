//source from http://stackoverflow.com/a/14660057
const getArguments = (func) => {
    return (func + '')
        .replace(/[/][/].*$/mg, '') // strip single-line comments
        .replace(/\s+/g, '') // strip white space
        .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments  
        .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters  
        .replace(/=[^,]+/g, '') // strip any ES6 defaults  
        .split(',').filter(Boolean); // split & filter [""]
}
export default function Inject (map){
    const injectMap = Object.assign({}, map);
    return store => next => action => {
        if (typeof action === "function") {
            const args = getArguments(action).map(function (arg, index) {
                switch (arg) {
                    case "dispatch":
                        return store.dispatch;
                    case "store":
                        return store;
                    default:
                        let dependency = injectMap[arg];
                        if(typeof dependency === "function"){
                            return new injectMap[arg](store.dispatch);
                        }else{
                            return dependency;
                        }
                }
            });
            return action.apply(this, args);
        } else {
            return next(action);
        }
    }
}