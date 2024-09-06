import { useRef, useState } from 'react';
import question_mark from './assets/image.png';
import dots from './assets/dots.png';
import bar from './assets/bar.png';
import nature from './assets/nature.avif';
import office from './assets/office.avif';
import work from './assets/work.avif';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { FileUpload } from 'primereact/fileupload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { createTheme, ThemeProvider } from '@mui/material'; // To config MUI icons breakpoints
import { LazyLoadImage } from 'react-lazy-load-image-component';
import toast from 'react-hot-toast';

const Widgets = () => {
  const [selected_tab, setSelected_tab] = useState('About Me');
  const [images, setImages] = useState([nature, office, work]);
  const [displayImages, setDisplayImages] = useState(images);
  const [index, setIndex] = useState(0);
  const slider = useRef(null);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024
      }
    }
  });

  const onSelect = (e) => {
    const newImage = e.files[0].objectURL;
    setImages(prevImages => [...prevImages, newImage]);
    toast.success('File Uploaded');
  };


  const handleScroll = (btype) => {
    if (btype === "prev" && index > 0) {
      setDisplayImages(images.slice(index - 1, index - 1 + 3));
      setIndex(index - 1);
    } else if (btype === "next" && index < images.length - 3) {
      setDisplayImages(images.slice(index + 1, index + 1 + 3));
      setIndex(index + 1);
    }
  }

  return (
    <div className="flex flex-row gap-x-10 mt-6 mx-20">
      <div className="flex w-[50%]">

      </div>

      <div className="flex flex-col gap-y-3 max-w-[50%] border-none">

        {/* First widget */}
        <div className="flex flex-col py-3 bg-[#283039] rounded-xl widget">
          <img src={question_mark} className='absolute lg:w-[20px] md:w-[15px] lg:ml-[10px] md:ml-[9px]' />

          <div className='flex justify-between p-1 lg:mx-10 md:mx-7 bg-black rounded-xl'>
            <button className={`text-white poppins lg:text-[14px] md:text-[10px] text-centr lg:w-[35%] md:w-[50%] py-2 ${selected_tab === "About Me" ? 'bg-[#28292F] btn' : ''}  rounded-lg`} onClick={() => setSelected_tab('About Me')}>About Me</button>
            <button className={`text-white poppins lg:text-[14px] md:text-[10px] text-centr lg:w-[35%] md:w-[50%] py-2 ${selected_tab === "Experiences" ? 'bg-[#28292F] btn' : ''} rounded-lg`} onClick={() => setSelected_tab('Experiences')}>Experiences</button>
            <button className={`text-white poppins lg:text-[14px] md:text-[10px] text-centr lg:w-[35%] md:w-[50%] py-2 ${selected_tab === "Recommended" ? 'bg-[#28292F] btn' : ''} rounded-lg`} onClick={() => setSelected_tab('Recommended')}>Recommended</button>
          </div>

          <div className='flex px-3 gap-x-4 mt-6 '>
            <img src={dots} className='flex lg:w-[20px] md:w-[16px] self-center' />
            <p className='text-[#969696] lg:text-[14px] md:text-[10px]'>Hello! I'm Khan Mohammed Sohel. I'm living in Mumbai City. I have recently completed my
              B.E in Computer Science and Engineering with specialization in Artificial Intelligence and machine Learning.
              <br />
              <br />
              Throughout my academic journey, I have upskilled myself in Frontend development and building machine learning and deep
              learning based models. I have also participated in national-level hackathon.
            </p>
            <img src={bar} className='flex self-center h-fit lg:w-[20px] md:w-[16px]' />
          </div>
        </div>

        {/* Horizontal Line */}
        <div className='line p-[2px] mx-10 rounded-xl'></div>

        {/* ************************************* Second widget *************************************** */}
        <div className='flex flex-col py-3 bg-[#283039] rounded-xl widget'>
          <img src={question_mark} className='absolute lg:w-[20px] md:w-[15px] lg:ml-[10px] md:ml-[9px]' />

          {/* ------------- Heading ------------ */}
          <div className='flex justify-between items-center lg:ml-10 lg:mr-8 md:ml-7 md:mr-4'>
            <div className='flex items-center bg-[#171717] lg:text-[16px] md:text-[12px] text-white poppins lg:px-5 lg:py-3 md:px-3 md:py-2 shadow-black shadow-inner  rounded-xl'>
              Gallery
            </div>

            <div className='flex flex-row items-center lg:gap-x-4 md:gap-x-2'>
              <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} auto chooseLabel="ADD IMAGE" onSelect={onSelect} className="custom-upload-button" />
              <div className='flex lg:gap-x-2 md:gap-x-1'>
                <div className='w-fit h-fit lg:p-1.5 md:p-1 rounded-full active:scale-75 cursor-pointer arrow' onClick={() => { handleScroll("prev") }}><ThemeProvider theme={theme}><ArrowBackIcon className=' text-[#6F787C]' sx={{ width: { lg: '25px', md: '22px' } }} /></ThemeProvider></div>
                <div className='w-fit h-fit lg:p-1.5 md:p-1 rounded-full active:scale-75 cursor-pointer arrow' onClick={() => { handleScroll("next") }}><ThemeProvider theme={theme}><ArrowForwardIcon className=' text-[#6F787C]' sx={{ width: { lg: '25px', md: '22px' } }} /></ThemeProvider></div>
              </div>
            </div>
          </div>
          {/* ----------------------------- */}

          {/* Display Images */}
          <div className='flex lg:gap-x-3 md:gap-x-1 lg:pl-3 md:pl-2.5 lg:mr-8 md:mr-4 mt-6'>
            <img src={dots} className='lg:w-[20px] md:md:w-[16px] self-center' />
            <div ref={slider} className='flex lg:gap-x-3 md:gap-x-2 image-container'>
              {displayImages.map((image, index) => (
                <LazyLoadImage
                  key={index}
                  src={image}
                  effect="black-and-white"
                  className='flex-grow min-w-0 lg:h-[145px] md:h-[100px] opacity-50 hover:opacity-100 hover:scale-[105%] hover:-rotate-[4deg] transition-transform duration-300 ease-in-out rounded-xl bg-cover object-cover'
                />
              ))}
            </div>
          </div>

        </div>

        {/* Horizontal Line */}
        <div className='p-[2px] mx-10 mb-10 rounded-xl line'></div>

      </div>

    </div>
  )
}

export default Widgets