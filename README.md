# cloudinary-experimental

This program will set `/api/upload` to be a POST endpoint that handles file uploading to my Cloudinary account and storing the link to my MongoDB database.
This uses Multer to temporary store the file in the server, which it will send to Cloudinary.

## Usage

1. Install all node modules with
```bash
npm i
```
2. Create a `.env` file containing the keys for Cloudinary and MongoDB.
3. Start the app with `npm start`.
4. Send a POST requst to `api/upload` with a file attached.

Insomnia:
```bash
curl --request POST \
  --url http://localhost:5000/api/upload \
  --header 'Content-Type: multipart/form-data' \
  --header 'User-Agent: insomnia/8.6.1' \
  --form pdf=@/path/to/file
```
