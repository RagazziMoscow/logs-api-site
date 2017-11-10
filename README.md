This application downloads and shows information about users visiting your site.
You can see following data:

* Date of the each visit
* Duration of the each visit
* Pages user had seen(titles, urls)
* Users ID

### Install

`git clone https://github.com/RagazziMoscow/logs-api-site.git .`


### Config

You need do create `config` folder into the root directory and put here `index.js` file.
Content of `index.js`:

```javascript
module.exports = {
  API: {
    token: 'stringWithAuthToken',
    counterID: YourCounterID
  }
}
```
