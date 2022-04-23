const UploadFile = ({
    
}) => {
    const uploadConfirm = () => {
        Papa.parse(document.getElementById("uploadfile").files[0], {
        dynamicTyping: false,
        download: true,
        header: true,
        complete: function(results) {
        setData(results.data);
        setLoading(false);
        headers = Object.keys(results.data[0]);
    },
        error: function(err) {
        setError(true);
    }
    });
    };
  return (
    <div className="uppload">
      <input type="file" id="uploadfile" accept='.csv'/>
      <button onClick={() => uploadConfirm()}>Upload</button>
    </div>
  );
};

export default UploadFile;