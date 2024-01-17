"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import ScaleLoaderComponent from '@/components/loading/ScaleLoader';

import { getImage, faceswap, checkPro, uploadImage, updatePro } from '@/api/apis';

import { ArrowLeftIcon, FolderOpenIcon } from '@heroicons/react/24/outline';

const Editor = () => {
    const router = useRouter();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const sourceRef = useRef<HTMLCanvasElement | null>(null);
    const targetRef = useRef<HTMLCanvasElement | null>(null);
    const [showCanvasSource, setShowCanvasSource] = useState(false);
    const [showCanvasTarget, setShowCanvasTarget] = useState(false);
    const [token, setToken] = useState<string>("");
    const [lastImage, setLastImage] = useState<File | null>(null);
    const [opacity, setOpacity] = useState(1);
    const [processing, setProcessing] = useState(false);
    const [recover, setRecover] = useState(false);
    const [imageHighUrlArray, setImageHighUrlArray] = useState<string[]>([]);
    const [imageLowUrlArray, setImageLowUrlArray] = useState<string[]>([]);
    const [latestImageHighUrl, setLatestImageHighUrl] = useState<string>("");
    const [latestImageLowUrl, setLatestImageLowUrl] = useState<string>("");
    const [pro, setPro] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sourceImageUrl, setSouceImageUrl] = useState(null);
    const [targetImageUrl, setTargetImageUrl] = useState(null);
    const [sourceImage, setSourceImage] = useState<File | null>(null);
    const [targetImage, setTargetImage] = useState<File | null>(null);

    const uploadedSource = (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileInput = event.target;
      if (!fileInput.files || fileInput.files.length === 0) {
        return;
      }
    
      const file = fileInput.files[0];
      console.log(file);

      const uploadImageToServer = async () => {
          try {
              setUploading(true);
              setLoading(true);
              const response = await uploadImage(file); 
              const { status, image_url } = response;
              if (status === "1"){
                  console.log(image_url);
                  sessionStorage.setItem('faceswap_source_image_url', image_url);
                  setShowCanvasSource(true);
                  console.log("your are " + image_url);
                  setSouceImageUrl(image_url);
                  // renderSourceCanvas();
              }
          } catch (error) {
              console.log(error);
          } finally {
              setUploading(false);
          };
      };
      uploadImageToServer();
    };

    const uploadedTarget = (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileInput = event.target;
      if (!fileInput.files || fileInput.files.length === 0) {
        return;
      }
    
      const file = fileInput.files[0];
      console.log(file);

      const uploadImageToServer = async () => {
          try {
              setUploading(true);
              setLoading(true);
              const response = await uploadImage(file); 
              const { status, image_url } = response;
              if (status === "1"){
                  console.log(image_url);
                  sessionStorage.setItem('faceswap_target_image_url', image_url);
                  setShowCanvasTarget(true);
                  setTargetImageUrl(image_url);
              }
          } catch (error) {
              console.log(error);
          } finally {
              setUploading(false);
          };
      };
      uploadImageToServer();
    };

    useEffect(() => {
      renderSourceCanvas();
    }, [sourceImageUrl]);

    useEffect(() => {
      renderTargetCanvas();
    }, [targetImageUrl]);

    const renderSourceCanvas = () => {
      // setLoading(true);
      const canvas = sourceRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const image_url = sourceImageUrl;

      console.log("dddd"+image_url);

      if (image_url) {
          const loadImage = async () => {
              const blob = await getImage(image_url);
              if (!blob) {
                console.error("blob is null");
                return;
              }
              const sourceImageFile = new File([blob], 'image.png', { type: 'image/png' });
              setSourceImage(sourceImageFile);

              const img = new Image();
              img.src = URL.createObjectURL(blob);;
              img.onload = () => {
                  // const maxCanvasWidth = window.innerWidth * (1 / 3);
                  // const maxCanvasHeight = window.innerHeight * (3 / 8);

                  const maxCanvasWidth = 512;
                  const maxCanvasHeight = 240;

                  let newWidth = img.width;
                  let newHeight = img.height;

                  if (newWidth > maxCanvasWidth) {
                      newHeight = (maxCanvasWidth / img.width) * img.height;
                      newWidth = maxCanvasWidth;
                  }
      
                  if (newHeight > maxCanvasHeight) {
                      newWidth = (maxCanvasHeight / img.height) * img.width;
                      newHeight = maxCanvasHeight;
                  }

                  canvas.width = newWidth;
                  canvas.height = newHeight;

                  ctx.drawImage(img, 0, 0, newWidth, newHeight);
                  setLoading(false);
              };
          };
          loadImage();
      }
    };

    const renderTargetCanvas = () => {
      // setLoading(true);
      const canvas = targetRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const image_url = targetImageUrl;

      console.log("dddd"+image_url);

      if (image_url) {
          const loadImage = async () => {
              const blob = await getImage(image_url);
              if (!blob) {
                console.error("blob is null");
                return;
              }
              const targetImageFile = new File([blob], 'image.png', { type: 'image/png' });
              setTargetImage(targetImageFile);

              const img = new Image();
              img.src = URL.createObjectURL(blob);;
              img.onload = () => {
                  // const maxCanvasWidth = window.innerWidth * (1 / 3);
                  // const maxCanvasHeight = window.innerHeight * (3 / 8);
                  const maxCanvasWidth = 512;
                  const maxCanvasHeight = 240;

                  let newWidth = img.width;
                  let newHeight = img.height;

                  if (newWidth > maxCanvasWidth) {
                      newHeight = (maxCanvasWidth / img.width) * img.height;
                      newWidth = maxCanvasWidth;
                  }
      
                  if (newHeight > maxCanvasHeight) {
                      newWidth = (maxCanvasHeight / img.height) * img.width;
                      newHeight = maxCanvasHeight;
                  }

                  canvas.width = newWidth;
                  canvas.height = newHeight;

                  ctx.drawImage(img, 0, 0, newWidth, newHeight);
                  setLoading(false);
              };
          };
          loadImage();
      }
    };

    const renderCanvas = (image_high_url: any, image_low_url?: any) => {
      // setLoading(true);
      if (!sourceImage || !targetImage) {
        setUploading(false);
        return;
      }
      if (image_high_url == "" || image_low_url == "") {
        alert("请上传包含人脸的图片");
      }
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      setLatestImageHighUrl(image_high_url);
      setLatestImageLowUrl(image_low_url);
      if (!recover) {
        const newImageHighUrlArray: string[] = [...imageHighUrlArray, image_high_url];
        setImageHighUrlArray(newImageHighUrlArray);
        if (image_low_url) {
          const newImageLowUrlArray = [...imageLowUrlArray, image_low_url];
          setImageLowUrlArray(newImageLowUrlArray);
        }
      } else {
        setRecover(false);
      }

      if (image_low_url) {
          const loadImage = async () => {
              const blob = await getImage(image_low_url);
              if (!blob) {
                console.error("blob is null");
                return;
              }
              const lastImageFile = new File([blob], 'image.png', { type: 'image/png' });
              setLastImage(lastImageFile);

              const img = new Image();
              img.src = URL.createObjectURL(blob);;
              img.onload = () => {
                  const maxCanvasWidth = window.innerWidth * (2 / 3);
                  const maxCanvasHeight = window.innerHeight * (3 / 4);

                  let newWidth = img.width;
                  let newHeight = img.height;

                  if (newWidth > maxCanvasWidth) {
                      newHeight = (maxCanvasWidth / img.width) * img.height;
                      newWidth = maxCanvasWidth;
                  }
      
                  if (newHeight > maxCanvasHeight) {
                      newWidth = (maxCanvasHeight / img.height) * img.width;
                      newHeight = maxCanvasHeight;
                  }

                  canvas.width = newWidth;
                  canvas.height = newHeight;

                  ctx.drawImage(img, 0, 0, newWidth, newHeight);

                  setProcessing(false);
                  setLoading(false);
              };
          };
          loadImage();
      }
    };

    useEffect(() => {
      const image_url = sessionStorage.getItem('image_url');
      renderCanvas(image_url, image_url);
    }, []);

    useEffect(() => {
      const local_token = localStorage.getItem('token');
      if (local_token) {
        setToken(local_token);
      }
    }, []);

    useEffect(() => {
      if (processing) {
        const interval = setInterval(() => {
          setOpacity((prevOpacity) => (prevOpacity === 1 ? 0.3 : 1));
        }, 400);
        return () => clearInterval(interval);
      } else {
        setOpacity(1);
      }
    }, [processing]);

    useEffect(() => {
      console.log(imageHighUrlArray);
    }, [imageHighUrlArray]);

    useEffect(() => {
      console.log(imageLowUrlArray);
    }, [imageLowUrlArray]);

    useEffect(() => {
      console.log(recover);
      if (recover && imageHighUrlArray.length > 1) {
        const newImageHighUrlArray = imageHighUrlArray.slice(0, -1);
        const image_url = newImageHighUrlArray[newImageHighUrlArray.length - 1];
        setImageHighUrlArray(newImageHighUrlArray);

        const newImageLowUrlArray = imageLowUrlArray.slice(0, -1);
        const image_low_url = newImageLowUrlArray[newImageLowUrlArray.length - 1];
        setImageLowUrlArray(newImageLowUrlArray);

        renderCanvas(image_url, image_low_url);
      }
    }, [recover, imageHighUrlArray, imageLowUrlArray]);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;
          const response = await checkPro(token);
          const { status, effective } = response;
          console.log(response);
          if (status === "1") {
            if (effective) {
              setPro(true);
            }
          }
        } catch (error) {
            console.log(error);
        };
      };
      fetchData();
    }, []);


  const backTo = async(event: { preventDefault: () => void; }) => {
    router.push('/faceswap');
  }

  const doSwapface = async(event: { preventDefault: () => void; }) => {
    const canvas = canvasRef.current;
    if (canvas && sourceImage && targetImage){
      setProcessing(true);
      const response = await faceswap(token, sourceImage, targetImage);
      const { status, image_high_url, image_low_url } = response;
      if (status === "1") {
        renderCanvas(image_high_url, image_low_url);
      }
    }
  }

  const goPrice = () => {
    router.push('/price');
  };

  const selectAnotherSource = async() => {
    setShowCanvasSource(false);
  };

  const selectAnotherTarget = async() => {
    setShowCanvasTarget(false);
  };

  const handleDownloadHighClick = async () => {
    try {
      console.log(pro)
      if (pro) {
        const response = await updatePro(token);
        const { status, msg, effective } = response;
        console.log(status)
        if (!latestImageHighUrl) return;
        await fetch(latestImageHighUrl)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          const fileName = latestImageHighUrl.substring(latestImageHighUrl.lastIndexOf('/') + 1);
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch(error => console.error('Error downloading image:', error));
      } else {
        const pro_modal = document.getElementById('pro_modal') as HTMLDialogElement | null;
        if (pro_modal) {
          pro_modal.showModal();
        }
      }
    } catch (error) {
      console.error('下载图片时发生错误:', error);
    }
  }

  const handleDownloadLowClick = async () => {
    try {
      if (!latestImageLowUrl) return;
      await fetch(latestImageLowUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        const fileName = latestImageLowUrl.substring(latestImageLowUrl.lastIndexOf('/') + 1);
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch(error => console.error('Error downloading image:', error));
    } catch (error) {
      console.error('下载图片时发生错误:', error);
    }
  }

  return (
    <div className='w-full h-screen flex justify-center items-start bg-black' >
        <header className="fixed flex items-center flex-wrap h-14 sm:justify-start sm:flex-nowrap z-50 w-full bg-black text-sm py-3 sm:py-0 light:bg-gray-800 ">
            <nav className="relative w-full pr-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 w-40 grow sm:block">
                <div className="flex justify-start flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:gap-y-0 sm:gap-x-3 sm:mt-0 sm:ps-7">
                    <button type="button" className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border  text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        onClick={backTo}
                    >
                    <ArrowLeftIcon className='h-5 w-5' />
                    返回
                    </button>
                </div>
                </div>

                <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
                <div className="flex justify-end flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:gap-y-0 sm:gap-x-3 sm:mt-0 sm:ps-7">
                    <button type="button" className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={doSwapface}
                      disabled={processing}
                    >
                    一键换脸
                    </button>
                    <button type="button" className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      disabled={processing}
                      onClick={handleDownloadLowClick}
                    >
                    下载低分辨率
                    </button>
                    <button type="button" className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      disabled={processing}
                      onClick={ handleDownloadHighClick}
                    >
                    下载高清图片
                    </button>
                    <dialog id="pro_modal" className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">付费功能</h3>
                        <p className="py-4">下载高清图片是付费功能，请查看付费计划</p>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn" >取消</button>
                          </form>
                          <form method="dialog">
                            <button className="btn btn-active btn-primary" onClick={goPrice}>去付费</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                </div>
                </div>
            </nav>
        </header>

        <div className='w-full h-screen flex justify-center items-center bg-black'
          style={{ background: "radial-gradient(circle, #6F6F6F 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        >

          <div className='flex-1 w-full h-[calc(100%-3.5rem)] mt-14' >
            <div className="flex h-1/2 p-4 w-full items-center justify-center">
              {
                !showCanvasSource && 
                <label
                  className="flex justify-between w-68 h-28 px-4 rounded-xl transition bg-white bg-opacity-10 border-2 border-gray-300 border-dashed appearance-none cursor-pointer hover:bg-opacity-20  hover:border-gray-400 focus:outline-none">
                  <span className="flex items-center space-x-2 ">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="font-medium text-gray-300 text-base">
                          上传源人脸图片
                      </span>
                  </span>
                  <input type="file" name="file_upload" className="hidden" accept="image/png, image/jpeg, image/jpg" onChange={uploadedSource} />
                </label>
              }
              { showCanvasSource && 
                <button type="button" className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border absolute left-0 border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  onClick={selectAnotherSource}
                >
                换一张
                </button>
              }
              {
                showCanvasSource && 
                <div className="flex relative transition-opacity duration-200 ease-in-out items-center justify-center bg-white w-128 h-60 rounded-lg" style={{ opacity: opacity }}>
                  <canvas
                    ref={sourceRef}
                    width={300}
                    height={150}
                  />
                </div>
              }
            </div>

            <div className="flex h-1/2 p-4 w-full items-center justify-center">
              {
                !showCanvasTarget && 
                <label
                  className="flex justify-between w-68 h-28 px-4 rounded-xl transition bg-white bg-opacity-10 border-2 border-gray-300 border-dashed appearance-none cursor-pointer hover:bg-opacity-20  hover:border-gray-400 focus:outline-none">
                  <span className="flex items-center space-x-2 ">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="font-medium text-gray-300 text-base">
                          上传目标人脸图片
                      </span>
                  </span>
                  <input type="file" name="file_upload" className="hidden" accept="image/png, image/jpeg, image/jpg" onChange={uploadedTarget} />
                </label>
              }
              { showCanvasTarget && 
                <button type="button" className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border absolute left-0 border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  onClick={selectAnotherTarget}
                >
                换一张
                </button>
              }
              {
                showCanvasTarget && 
                <div className="flex relative transition-opacity duration-200 ease-in-out items-center justify-center bg-white w-128 h-60 rounded-lg" style={{ opacity: opacity }}>
                  <canvas
                    ref={targetRef}
                    width={300}
                    height={150}
                  />
                </div>
              }
            </div>

          </div>

          

          <div className='flex-1 w-full h-[calc(100%-3.5rem)] mt-14 grid place-items-center'>
            <div className="flex relative transition-opacity duration-200 ease-in-out items-center justify-center" style={{ opacity: opacity }}>
              <canvas
                ref={canvasRef}
                width={500}
                height={300}
              />
            </div>
          </div>

        </div>
        
        {loading && <ScaleLoaderComponent />}
    </div>
  );
};

export default Editor;
