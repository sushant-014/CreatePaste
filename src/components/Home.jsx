import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, SetSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const allPastes = useSelector((state)=>state.paste.pastes)


  const dispatch = useDispatch();

  useEffect(() => {
   if(pasteId){
    const paste = allPastes.find((p) => p._id === pasteId);
    setTitle(paste.title);
    setValue(paste.content);
   }
   else{
    console.warn("Paste not found with ID:", pasteId)
   }
  }, [pasteId]
)
  

  function createPaste(){
    const paste = {
      title : title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt : new Date().toISOString(),
    }

    if(pasteId){
      // update
      dispatch(updateToPastes(paste));
      console.log("updateToPaste",updateToPastes());

    }
    else{
    // create
    dispatch(addToPastes(paste));

    }

    // after creation and updation
    setTitle('');
    setValue('');
    SetSearchParams({});

  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between ">
        <input
          className=" bg-black p-2 rounded-2xl mt-2"
          type="text"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <button onClick={createPaste}
        className=" bg-black p-2 rounded-2xl mt-2">
          {pasteId ? "Update Paste" : "Create My Paste"}
        </button>
      </div>
      
      <div className="mt-8">
        <textarea 
        className=" bg-black rounded-2xl min-w-[500px] p-4"
         value={value}
         placeholder="Enter content here"
         onChange={(e) =>setValue(e.target.value)}
         rows={20}
        />
      </div>
    </div>
  );
};
export default Home;
