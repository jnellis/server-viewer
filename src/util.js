/**
 * Created by Joe Nellis on 7/4/2016.
 */

const getShortUID = function () {
  return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4)
}


export { getShortUID };
