import { motion } from "framer-motion";
import axios from "axios";
import { SetStateAction, useState } from "react";

interface result {
  title: string;
  thumb: string;
  description: string;
  link: any;
  status: string;
}

function Home() {
  const [stage, setStage] = useState(0);
  const [link, setLink] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [inputEmpty, setInputEmpty] = useState<boolean>(false);
  const [shortLink, setShortLink] = useState<string>("");
  const [vidLink, setVidLink] = useState<string>("");
  const [res, setRes] = useState<result>();
  const [isloading, setIsLoading] = useState<boolean>(false);

  const apiKey = import.meta.env.VITE_RAPID_API_KEY;
  const apiHost = import.meta.env.VITE_RAPID_API_HOST;

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setLink(event.target.value);
  };

  const handleSubmit = async () => {
    if (link.length >= 52) {
      let newUrl = link.slice(27);
      const newerUrl = newUrl.slice(0, 11);
      setShortLink(newerUrl);
      setSubmitted(true);
    } else if (link.length <= 52) {
      const newUrl = link.slice(17);
      setVidLink(newUrl);
      setSubmitted(true);
    } else if (link.length === 0) {
      setInputEmpty(true);
    } else {
      setInputEmpty(true);
    }
  };

  const handleSubmit2 = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request({
        method: "GET",
        url: "https://youtube-video-download-info.p.rapidapi.com/dl",
        params: { id: link.length === 28 ? vidLink : shortLink },
        headers: {
          "content-type": "application/octet-stream",
          "X-RapidAPI-Key": `${apiKey}`,
          "X-RapidAPI-Host": `${apiHost}`,
        },
      });
      setRes(response.data);
      setStage(1);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  console.log(res?.link);

  return (
    <div className="bg-[orange] w-full min-h-[100vh] p-[4%] sm:p-[10%] lg:p-[5%] flex flex-col justify-center items-center">
      {isloading && (
        <div className="w-full min-h-[100vh] bg-black-rgba fixed top-0 z-20 flex justify-center items-center">
          <div className="spinner">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      )}
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
        submitted ? (
          <>
            {!submitted ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-black rounded text-white px-[2%] py-[.5%]"
              >
                Search
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit2}
                className="bg-black rounded text-white px-[2%] py-[.5%]"
              >
                Get Result
              </button>
            )}
          </>
        ) : (
          <>
            <h2 className="mb-[6px]">Youtube video link</h2>
            <input
              type="text"
              name="link"
              value={link}
              onChange={handleChange}
              className="mb-[14px] w-[50%] md:w-[25%] h-[35px] rounded outline-none indent-2"
            />
            {inputEmpty && (
              <>
                <p className="text-[red] text-xm mb-[14px]">
                  Input field cannot be empty
                </p>
              </>
            )}
            {!submitted ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-black rounded text-white px-[2%] py-[.5%]"
              >
                Search
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit2}
                className="bg-black rounded text-white px-[2%] py-[.5%]"
              >
                Get Result
              </button>
            )}
          </>
        )
      ) : (
        <>
          {res?.status === "fail" ? (
            <>
              <h2 className="mb-[6px]">Youtube video link</h2>
              <input
                type="text"
                name="link"
                value={link}
                onChange={handleChange}
                className="mb-[14px] w-[50%] md:w-[25%] h-[35px] rounded outline-none indent-2"
              />
              <p className="text-[red] text-xm mb-[6px]">Invalid url</p>
              <p className="text-xm mb-[10px]">
                Click the button below to start all over
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="bg-black rounded text-white px-[2%] py-[.5%]"
              >
                Reload
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
                    <p>144p</p>
                    <button className="bg-black rounded text-white w-[100px] py-[6%] capitalize">
                      <a
                        href={
                          res?.link === undefined
                            ? ""
                            : res?.link[Object.keys(res?.link)[0]]
                        }
                      >
                        download
                      </a>
                    </button>
                  </div>
                  <div className="flex flex-col justify-center items-center w-[16%]">
                    <p>360p</p>
                    <button className="bg-black rounded text-white w-[100px] p-[6%] capitalize">
                      <a
                        href={
                          res?.link === undefined
                            ? ""
                            : res?.link[Object.keys(res?.link)[1]]
                        }
                      >
                        download
                      </a>
                    </button>
                  </div>
                  <div className="flex flex-col justify-center items-center w-[16%]">
                    <p>720p</p>
                    <button className="bg-black rounded text-white w-[100px] p-[6%] capitalize">
                      <a
                        href={
                          res?.link === undefined
                            ? ""
                            : res?.link[Object.keys(res?.link)[2]]
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
        </>
      )}
    </div>
  );
}

export default Home;
