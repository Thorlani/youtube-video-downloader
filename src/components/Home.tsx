import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";

interface result {
  title: string;
  thumb: string;
  description: string;
  link: any;
  status: string;
}

function Home() {
  const [stage, setStage] = useState(0);
  const [res, setRes] = useState<result>();
  const [link, setLink] = useState<string>("");

  const apiKey = import.meta.env.VITE_RAPID_API_KEY;
  const apiHost = import.meta.env.VITE_RAPID_API_HOST;

  const options = {
    method: "GET",
    url: "https://youtube-video-download-info.p.rapidapi.com/dl",
    params: { id: link.slice(17) },
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": `${apiKey}`,
      "X-RapidAPI-Host": `${apiHost}`,
    },
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.request(options);
      setRes(response.data);
      setStage(1);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="bg-[orange] w-full min-h-[100vh] p-[4%] sm:p-[10%] lg:p-[5%] flex flex-col justify-center items-center">
      <motion.div
        className="w-[200px] h-[200px] bg-white relative top-[-40px]"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
      >
        <motion.h1
          className="font-bold text-2xl"
          animate={{
            y: 80,
            x: 30,
          }}
        >
          Utube-Video
        </motion.h1>
        <motion.p
          animate={{
            y: 90,
            x: 58,
          }}
        >
          Downloader
        </motion.p>
      </motion.div>
      {stage === 0 ? (
        <>
          <h2 className="mb-[6px]">Youtube video link</h2>
          <input
            type="text"
            name="link"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            className="mb-[14px] w-[25%] h-[35px] rounded outline-none indent-2"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-black rounded text-white px-[2%] py-[.5%]"
          >
            Search
          </button>
        </>
      ) : (
        <>
          <h3>Search Result</h3>
          <img src={`${res?.thumb}`} alt="" />
          <h2>{res?.title}</h2>
          <p>{res?.description.slice(0, 24)}</p>
          <div className="w-[40%] flex flex-col items-center">
            <h3>Dowload links</h3>
            <div className="flex flex-col sm:flex-row w-full justify-center sm:justify-between items-center">
              <div className="flex flex-col justify-center items-center w-[16%]">
                <p>480px</p>
                <button className="bg-black rounded text-white w-[100px] py-[6%] capitalize">
                  <a
                    href={
                      res?.link === undefined
                        ? ""
                        : res?.link[Object.keys(res?.link)[5]]
                    }
                  >
                    download
                  </a>
                </button>
              </div>
              <div className="flex flex-col justify-center items-center w-[16%]">
                <p>720px</p>
                <button className="bg-black rounded text-white w-[100px] p-[6%] capitalize">
                  <a
                    href={
                      res?.link === undefined
                        ? ""
                        : res?.link[Object.keys(res?.link)[6]]
                    }
                  >
                    download
                  </a>
                </button>
              </div>
              <div className="flex flex-col justify-center items-center w-[16%]">
                <p>1070px</p>
                <button className="bg-black rounded text-white w-[100px] p-[6%] capitalize">
                  <a
                    href={
                      res?.link === undefined
                        ? ""
                        : res?.link[Object.keys(res?.link)[7]]
                    }
                  >
                    download
                  </a>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
