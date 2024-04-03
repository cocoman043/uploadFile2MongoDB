import axios from 'axios'
import { useState } from 'react';

const Form = () => {
  const [file, setFile] = useState(null);
  const [alt, setAlt] = useState('Choose a file and click Submit');

  async function uploadFile(e) {
    e.preventDefault()

    const bodyFormData = new FormData(e.target);

    setFile(null); // remove uploaded file
    setAlt('Uploading File...')

    axios.post("http://localhost:5000/api/upload", bodyFormData)
    .then((res) => {
        setFile(res.data.url);
        setAlt("File Uploaded!");
      }) // print the url of the uploaded file to console (accessible worldwide)
    .catch((err) => {
        console.error(err);
        setAlt("Failed to upload file :c");
      });
  }

  return(
    <div>
      <form onSubmit={uploadFile}>
        <input type="file" name="pdf"/>
          <button type="submit">Submit</button>
      </form>

      <div>{alt}</div>
      <embed src={file} width="600px" height="480px"/>
    </div>
  )
};

export default Form;
