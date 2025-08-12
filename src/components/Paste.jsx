import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ShareButtons from "./ShareButtons";
import { FaCopy} from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { LuShare } from 'react-icons/lu';
import { FcEditImage } from "react-icons/fc";


const Paste = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [shareIcons, setshareIcons] = useState(false)

  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId){
     dispatch(removeFromPastes(pasteId))
  }


  return (
    <div>
      <input
        className="p-4 rounded-2xl min-w-[600px] mt-5 bg-black"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />

      <div className="flex flex-col gap-5 p-5">
        {filterData.length > 0 &&
          filterData.map((paste) => {
            return (
            <div className="border" key={paste?._id}>
              <div className="">
                {paste.title}
              </div>
              <div className="m-2">
                {paste.content}
              </div>
              <div className="flex felx-row justify-evenly">
                <button>
                  <Link to={`/?pasteId=${paste?._id}`}>
                     <span>
                        <FcEditImage />
                     </span>
                  </Link>


                </button>

                <button>
                  <Link to={`/pastes/${paste._id}`}>
                      <div className="text-white">
                        < FaEye />
                      </div>
                  </Link>
                </button>

                <button onClick={()=> handleDelete(paste?._id)}>
                  <AiOutlineDelete />
                </button>

                <button onClick={()=>{
                  navigator.clipboard.writeText(paste?.content)
                  toast.success("Copied to Clipboard")
                }}>
                  <FaCopy />
                </button>
             {/** Isme Share ka option defined */}
                <button>
                  {shareIcons? <ShareButtons/> : <div onClick={()=>setshareIcons(true)}><LuShare/></div>}
                </button>

              </div>

              <div className="m-1 right-[5px]">
               {
                  new Date(paste.createdAt).toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                    }
                  )
                }
              </div>
            </div>
            )
          })}
      </div>
    </div>
  );
};
export default Paste;
