import { Circles } from 'react-loader-spinner';

function Loader() {
  return (
    <div className="w-full h-full flex justify-center items-center py-48 loader">
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        visible={true}
      />
    </div>
  );
}

export default Loader;
