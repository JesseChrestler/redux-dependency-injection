# redux-dependency-injection
Redux Middleware that simulates what angular does for dependency injection. 

## Basic Usage

### Store configuration
add all your injectable services here.
```sh
import ajaxService from  "some/file/path/where/service/is";
createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    Inject({ajaxService})
  )
);
```

###Action Setup
order doesn't matter as long as the names match the injected names
```sh
export function login (user){
  return function(dispatch, ajaxService){
    ajaxService.post("authenticate", user)
    .then((response)=>{
      dispatch(loginSuccess(response));
    })
    .catch((response)=>{
       dispatch(loginFailure(response));
    });
  }
}
```

### Service Setup
we pass the dipatch function to the service to allow our service to dipatch it's own set of actions internally. 
```sh
export default class AjaxService {
  constructor(dispatch){
      this.dispatch = dispatch;
  }
  ...
}

```

you can also use just objects or arrays as something you want to inject, as long as the function argument matches the name, it will pass it.
