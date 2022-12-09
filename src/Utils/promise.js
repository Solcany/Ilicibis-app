export const handlePromise = (promise, callback) => {
    if (promise !== undefined) {
      promise
        .then(() => {
          if(callback && typeof callback === "function") {
            callback()
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    }    
}