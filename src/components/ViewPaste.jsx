import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find((p) => String(p._id) == String(id));

  useEffect(() => {
    console.log("URL ID:", id);
    console.log("All Pastes:", allPastes);
    console.log("Found Paste:", paste);
    console.log("Paste Title:", paste?.title);
    console.log("Paste Content:", paste?.content);
  }, [id, allPastes]);

  if (!paste) {
    return (
      <div className="text-red-500 mt-10 text-center">
        Paste not found for ID: {id}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between ">
        <input
          className="bg-black p-2 rounded-2xl mt-2 text-white"
          type="text"
          value={paste.title}
          disabled
        />
      </div>

      <div className="mt-8 flex flex-col ">

        <textarea
          className="bg-black rounded-2xl min-w-[500px] p-4 text-white sm:md:min-w-[350px] lg:min-w-[500px]"
          value={paste.content}
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
