"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import ScaleLoaderComponent from '@/components/loading/ScaleLoader';

import { getImage, removeBG, checkPro, uploadImage, updatePro } from '@/api/apis';

import { ArrowLeftIcon, FolderOpenIcon } from '@heroicons/react/24/outline';
import { Slider, Sketch, Material, Colorful, Compact, Circle, Wheel, Block, Github, Chrome } from '@uiw/react-color';
import { Alpha, Hue, ShadeSlider, Saturation, hsvaToHslaString } from '@uiw/react-color';
import { EditableInput, EditableInputRGBA, EditableInputHSLA } from '@uiw/react-color';

const Editor = () => {
    const router = useRouter();
    const highCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const bgHighCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const highHiddenCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const bgHighHiddenCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const mergedHighCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [token, setToken] = useState<string>("");
    const [upscaled, setUpscaled] = useState(false);
    const [lastImage, setLastImage] = useState<File | null>(null);
    const [originalImage, setOriginalImage] = useState<File | null>(null);
    const [opacity, setOpacity] = useState(1);
    const [processing, setProcessing] = useState(false);
    const [recover, setRecover] = useState(false);
    const [imageHighUrlArray, setImageHighUrlArray] = useState<string[]>([]);
    const [imageLowUrlArray, setImageLowUrlArray] = useState<string[]>([]);
    const [latestImageHighUrl, setLatestImageHighUrl] = useState<string>("");
    const [latestImageLowUrl, setLatestImageLowUrl] = useState<string>("");
    const [originalImageUrl, setOriginalImageUrl] = useState<string>("");
    const [pro, setPro] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hex, setHex] = useState("#fff");
    const [highImageWidth, setHighImageWidth] = useState<number>(0);
    const [highImageHeight, setHighImageHeight] = useState<number>(0);
    const [filename, setFilename] = useState<string>("");

    const getFileName = (url) => {
      const lastSlashIndex = url.lastIndexOf('/');
      const fileNameWithExtension = url.substring(lastSlashIndex + 1);
      const fileName = fileNameWithExtension.split('.')[0];
      return fileName;
    };

    const generateRandomString = (): string => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let randomString = '';
    
      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      }
    
      return randomString;
    };

    const uploaded = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                  sessionStorage.setItem('image_url', image_url);
                  window.location.reload();
              }
          } catch (error) {
              console.log(error);
          } finally {
              setUploading(false);
          };
      };
      uploadImageToServer();
    };

    const renderCanvas = (image_high_url: any, image_low_url?: any) => {
      // setLoading(true);
      const canvas = highCanvasRef.current;
      const bgCanvas = bgHighCanvasRef.current;
      const hiddenCanvas = highHiddenCanvasRef.current;
      const bgHiddenCanvas = bgHighHiddenCanvasRef.current;
      if (!canvas || !bgCanvas || !hiddenCanvas || !bgHiddenCanvas) return;
      const ctx = canvas.getContext('2d');
      const bgCtx = bgCanvas.getContext('2d');
      const hiddenCtx = hiddenCanvas.getContext('2d');
      const bgHiddenCtx = bgHiddenCanvas.getContext('2d');
      if (!ctx || !bgCtx || !hiddenCtx || ! bgHiddenCtx) return;

      setLatestImageHighUrl(image_high_url);
      setLatestImageLowUrl(image_low_url);
      if (!recover) {
        if (image_low_url) {
          const newImageLowUrlArray = [...imageLowUrlArray, image_low_url];
          setImageLowUrlArray(newImageLowUrlArray);
        }
        if (image_high_url) {
          const newImageHighUrlArray = [...imageHighUrlArray, image_high_url];
          setImageHighUrlArray(newImageHighUrlArray);
        }
      } else {
        setRecover(false);
      }

      if (image_high_url) {
          const loadImage = async () => {
              const blob = await getImage(image_high_url);
              if (!blob) {
                console.error("blob is null");
                return;
              }
              const random_string = generateRandomString();
              const lastImageFile = new File([blob], 'colorbg_' + random_string + '.png', { type: 'image/png' });
              setLastImage(lastImageFile);

              const img = new Image();
              img.src = URL.createObjectURL(blob);;
              img.onload = () => {
                  const maxCanvasWidth = window.innerWidth * (2 / 3);
                  const maxCanvasHeight = window.innerHeight * (3 / 4);

                  let newWidth = img.width;
                  let newHeight = img.height;

                  setHighImageWidth(newWidth);
                  setHighImageHeight(newHeight);

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
                  bgCanvas.width = newWidth;
                  bgCanvas.height = newHeight;
                  hiddenCanvas.width = img.width;
                  hiddenCanvas.height = img.height;
                  bgHiddenCanvas.width = img.width;
                  bgHiddenCanvas.height = img.height;

                  ctx.drawImage(img, 0, 0, newWidth, newHeight);
                  hiddenCtx.drawImage(img, 0, 0, img.width, img.height);

                  setProcessing(false);
                  setLoading(false);
              };
          };
          loadImage();
      }
    };

    useEffect(() => {
      const local_token = localStorage.getItem('token');
      if (local_token) {
        setToken(local_token);
      } else {
        setToken("");
      }
    
      const image_url = sessionStorage.getItem('image_url');
      console.log("image_url:" + image_url);
      const local_filename = getFileName(image_url);
      if (local_filename) setFilename(local_filename);
      console.log("local_filename:" + local_filename);
      if (image_url) setOriginalImageUrl(image_url);
    }, []);

    useEffect(() => {
      setLoading(true);
      const getImageBlob = async () => {
        console.log("originalImageUrl:" + originalImageUrl);
        const blob = await getImage(originalImageUrl);
        if (!blob) {
          console.error("blob is null");
          return;
        }
        const random_string = generateRandomString();
        const originalImageFile = new File([blob], 'colorbg_' + random_string + '.png', { type: 'image/png' });
        setOriginalImage(originalImageFile);
      };
    
      if (originalImageUrl) {
        getImageBlob();
      }
    }, [originalImageUrl]);

    useEffect(() => {
      const goRemoveBG = async () => {
        const canvas = highCanvasRef.current;
        console.log("originalImage:" + originalImage);
        if (canvas && originalImage) {
          console.log("do remove bg....");
          const response = await removeBG(token, originalImage);
          const { status, image_high_url, image_low_url } = response;
          if (status === "1") {
            renderCanvas(image_high_url, image_low_url);
            setUpscaled(false);
          }
        }
      }
    
      goRemoveBG();
    }, [originalImage]);

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
      const bgCanvas = bgHighCanvasRef.current;
      const bgHiddenCanvas = bgHighHiddenCanvasRef.current;
      if (!bgCanvas || !bgHiddenCanvas) { return; }
      const bgCtx = bgCanvas.getContext('2d');
      const bgHiddenCtx = bgHiddenCanvas.getContext('2d');
      if (!bgCtx || !bgHiddenCtx) { return; }
      bgCtx.fillStyle = hex;
      bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
      bgHiddenCtx.fillStyle = hex;
      bgHiddenCtx.fillRect(0, 0, bgHiddenCanvas.width, bgHiddenCanvas.height);
    }, [hex]);


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
    router.push('/colorbg');
  }

  const doRemoveBG = async(event: { preventDefault: () => void; }) => {
    const canvas = highCanvasRef.current;
    if (canvas && lastImage){
      setProcessing(true);
      const response = await removeBG(token, lastImage);
      const { status, image_high_url, image_low_url } = response;
      if (status === "1") {
        renderCanvas(image_high_url, image_low_url);
        setUpscaled(false);
      }
    }
  }

  const goPrice = () => {
    router.push('/price');
  };

  const handleDownloadHighClick = async () => {
    try {
      console.log(pro)
      if (pro) {
        const response = await updatePro(token);
        const { status, msg, effective } = response;
        console.log(status)
        console.log(latestImageHighUrl)
        
        const hiddenCanvas = highHiddenCanvasRef.current;
        const bgHiddenCanvas = bgHighHiddenCanvasRef.current;
        const mergedCanvas = mergedHighCanvasRef.current;
        if (!hiddenCanvas || !bgHiddenCanvas || !mergedCanvas) return;
        const hiddenCtx = hiddenCanvas.getContext('2d');
        const bgHiddenCtx = bgHiddenCanvas.getContext('2d');
        const mergedCtx = mergedCanvas.getContext('2d');
        if (!hiddenCtx || !bgHiddenCtx || !mergedCtx) return;

        const width = hiddenCanvas.width;
        const height = hiddenCanvas.height;

        mergedCanvas.width = width;
        mergedCanvas.height = height;

        mergedCtx.drawImage(bgHiddenCanvas, 0, 0, width, height);
        mergedCtx.drawImage(hiddenCanvas, 0, 0, width, height);

        mergedCanvas.toBlob((blob) => {
          console.log(blob);
          if (blob) {
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = filename + '_colored.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          }
        }, 'image/png');

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
      const hiddenCanvas = highHiddenCanvasRef.current;
        const bgHiddenCanvas = bgHighHiddenCanvasRef.current;
        const mergedCanvas = mergedHighCanvasRef.current;
        if (!hiddenCanvas || !bgHiddenCanvas || !mergedCanvas) return;
        const hiddenCtx = hiddenCanvas.getContext('2d');
        const bgHiddenCtx = bgHiddenCanvas.getContext('2d');
        const mergedCtx = mergedCanvas.getContext('2d');
        if (!hiddenCtx || !bgHiddenCtx || !mergedCtx) return;

        const width = hiddenCanvas.width;
        const height = hiddenCanvas.height;

        mergedCanvas.width = width / 2;
        mergedCanvas.height = height / 2;

        mergedCtx.drawImage(bgHiddenCanvas, 0, 0, width / 2, height / 2);
        mergedCtx.drawImage(hiddenCanvas, 0, 0, width / 2, height / 2);

        mergedCanvas.toBlob((blob) => {
          console.log(blob);
          if (blob) {
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = filename + '_colored.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          }
        }, 'image/png');
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
                    {/* <button type="button" className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border  text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      disabled={processing}
                    >
                      <label htmlFor='file_upload' className='h-5 w-5'>
                      <FolderOpenIcon 
                        className='h-5 w-5'/>
                      <input type="file" id="file_upload" name="file_upload" className="opacity-0 w-5 h-5 absolute top-0 left-0 cursor-pointer" accept="image/png, image/jpeg, image/jpg" 
                        onChange={uploaded} disabled={processing} />
                      </label>
                    </button> */}
                    {/* <button type="button" className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={doRemoveBG}
                      disabled={processing || upscaled}
                    >
                    消除背景
                    </button> */}
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
          <div className='grid grid-cols-3 w-full h-[calc(100%-3.5rem)]'>
            <div className="relative transition-opacity duration-200 ease-in-out flex items-center justify-center" style={{ opacity: opacity, gridColumn: 'span 2', height: '100vh' }}>
              <div style={{ position: 'relative' }}>
                <canvas
                  ref={highCanvasRef}
                  width={0}
                  height={0}
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 5 }}
                />
                <canvas
                  ref={bgHighCanvasRef}
                  width={0}
                  height={0}
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 4 }}
                />
                <canvas
                  ref={highHiddenCanvasRef}
                  width={0}
                  height={0}
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: -1 }}
                />
                <canvas
                  ref={bgHighHiddenCanvasRef}
                  width={0}
                  height={0}
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: -2 }}
                />
                <canvas
                  ref={mergedHighCanvasRef}
                  width={0}
                  height={0}
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: -3 }}
                />
              </div>
            </div>
            
            <div className='flex items-center justify-center h-[calc(100%-3.5rem)]'>
              <Sketch
                style={{ marginLeft: 20 }}
                color={hex}
                onChange={(color) => {
                  setHex(color.hex);
                }}
              />
            </div>
          </div>  
        </div>
        
        {loading && <ScaleLoaderComponent />}
        {
          processing && 
          <div className="toast toast-top toast-center mt-10">
            <div className="alert alert-success">
              <span className="text-white">处理预计在2分钟时间内完成，请耐心等待，如果超过2分钟请刷新重试</span>
            </div>
          </div>
        }
    </div>
  );
};

export default Editor;
