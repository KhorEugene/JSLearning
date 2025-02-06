// Class for manipulating memory
export function DBManager(){
    let storAvail = false
    const storageAvailable = (type) => {
        let storage;
        try {
          storage = window[type];
          const x = "__storage_test__";
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
        } catch (e) {
          return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
          );
        }
      };

    const setStorage = (key, value) => {
        storAvail = storageAvailable("sessionStorage");
        if (storAvail) {
            sessionStorage.setItem(key, value);
            return true;
        }
        return false;
    }

    const getStorage = (key) => {
        storAvail = storageAvailable("sessionStorage");
        if (storAvail) {
            return sessionStorage.getItem(key);
        }
        return "ERROR: NO SESSION STORAGE";
    }

    return {
        setStorage, getStorage
    };
};