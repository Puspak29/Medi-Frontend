import { Link } from 'react-router-dom';

function Popup(props: any) {
    const handleClosePopUp = (e: any) => {
        if (e.target.id === 'ModelContainer') {
          props.closePopup();
        }
    }
    function handleClick(){
        props.setUserUrl(null)
        props.setDoctorUrl(null);
        props.setType(null);
        props.setOpenPopup(false);
    }
  return (
    <div id='ModelContainer'
    className='fixed inset-0 flex justify-center items-center bg-opacity-20 backdrop-blur-sm'
    onClick={handleClosePopUp}
    >
    <div className='flex justify-center items-center flex-col gap-y-3 bg-white p-5 rounded-lg shadow-lg h-60 w-80'>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Account Type
          </h2>
      <Link 
      to={props.userUrl} 
      onClick={handleClick}
      className='flex justify-center items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-40'>
        {props.type} as User
      </Link>
      <Link 
      to={props.doctorUrl} 
      onClick={handleClick}
      className='flex justify-center items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-40'>
        {props.type} as Doctor
      </Link>
    </div>
    </div>
  )
}

export default Popup
