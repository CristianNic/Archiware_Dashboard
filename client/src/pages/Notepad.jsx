// Create a wrapper function for getting the values from a single device, then call this multiple times using Promise.all (or Promise.map/each if using bluebird);

async function getDevices() {
  let devices = await  axios('http://10.10.10.1:8080/v1/devices/?access_token=687b5aee0b82f653c725570422dea5d37de6b65f');
  return this.devices = (devices.data)
};

async function getForOneDevice(device) {
    // I've assumed here that 'devices' in your API calls was a typo, and was intended to be devices[0] (based on the question)
    const RawDataPromise = axios(API + device + '/RawData/?access_token=' + Token);
    const ColorTempPromise = axios(API + device + '/ColorTemp/?access_token=' + Token);
    const LuxPromise = axios(API + device + '/Lux/?access_token=' + Token);
    const SensorArrayPromise = axios(API + device + '/SensorArray/?access_token=' + Token);
    const GainPromise = axios(API + devices + '/Gain/?access_token=' + Token);
    const IntegraTimePromise = axios(API + device + '/IntegraTime/?access_token=' + Token);
    const TemperatureCPromise = axios(API + device + '/TemperatureC/?access_token=' + Token);
    const TemperatureFPromise = axios(API + device + '/TemperatureF/?access_token=' + Token);
    const TemperatureKPromise = axios(API + device + '/TemperatureK/?access_token=' + Token);
    const TemperatureRPromise = axios(API + device + '/TemperatureR/?access_token=' + Token);
    return Promise.all([RawDataPromise, ColorTempPromise, LuxPromise, SensorArrayPromise,GainPromise,IntegraTimePromise,TemperatureCPromise,TemperatureFPromise,TemperatureKPromise,TemperatureRPromise]);
}

async function getVariables() {
    try {
        const devices = await getDevices();
        console.log(devices);

        const promises = [];
        devices.forEach((device) => {
            promises.push(getForOneDevice(device.id));
        })

        const allResults = Promise.all(promises);
    } catch (e) {
        console.error(e)
    }
}

getVariables();


// How do I pass a parameter to an event handler or callback?
// You can use an arrow function to wrap around an event handler and pass parameters:

<button onClick={() => this.handleClick(id)} />

