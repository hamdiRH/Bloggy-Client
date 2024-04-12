import React, { useState, useContext } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { useNavigate } from 'react-router-dom';
import{ Flex, Tag, Divider,Select } from "antd"
import moment from "moment-timezone"
import { UserContext } from '../../contexts/UserContextProvider';
import request from '../../services/api';
import Markdown from '../../components/Markdown';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import Button from '../../components/Button';

const fileTypes = ["JPG", "PNG"];

export function CreateArticle() {
  

  const { user } = useContext(UserContext) as any;
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [tags, setTags] = useState([{
    value:"React",
    label:"React",
  }]);

  const navigate = useNavigate();

  const handleChange = (file) => {
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    else setPreview(null)
  };

  async function submit(event: any) {
    event.preventDefault();
    const formData = new FormData()
    formData.append('file', file);
    formData.append('body', body);
    formData.append('title', title);
    formData.append('tags', JSON.stringify(tags.map(tag => tag.value)));


    try {
      const { status } = await request.post('/articles',formData );

      if (status === 200) {
        navigate('/');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message);
    }
  }

  const handleTagsChange = (value) => {
    setTags(value.map(el=>({value:el,label:el})));
  };


  return (
    <React.Fragment>
      <Navbar />
      <Container extraClasses='pt-32'>
        <div className='w-full'>
          <h1 className='font-bold text-4xl md:text-6xl leading-tight'>New Article</h1>
        </div>
        <div className='flex flex-wrap justify-center mt-10'>
          <div className='w-full md:w-2/5'>
            <div className='mr-6'>
              <form className='flex flex-col space-y-5' onSubmit={submit}>
                <div className='flex flex-col'>
                  <label className='text-xl'>Title</label>
                  <input
                    className='px-4 py-2 bg-white rounded border-2 focus:border-blue-500'
                    type='text'
                    name='title'
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <label className='text-xl'>Attach Document</label>
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    {preview &&    <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />}
    <label className='text-xl'>Tags</label>
    <Select
    mode="tags"
    style={{ width: '100%' }}
    onChange={handleTagsChange}
    tokenSeparators={[',']}
    options={tags}
  />
                <div className='flex flex-col'>
                  <label className='text-xl'>
                    Body (in{' '}
                    <a
                      className='text-blue-500 hover:text-blue-700 hover:underline'
                      href='https://www.markdownguide.org/'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Markdown
                    </a>{' '}
                    format)
                  </label>
                  <textarea
                    className='h-64 px-4 py-2 bg-white rounded border-2 focus:border-blue-500'
                                      name='body'
                    onChange={(event) => setBody(event.target.value)}
                  ></textarea>
                </div>
                {error ? <small className='mt-2 text-red-400'>{error}</small> : ''}
                <Button
                background="bg-blue-500"
                  nativeType='submit'
                  extraClasses='text-white duration-75 bg-blue-500 border-blue-500 hover:bg-blue-700 hover:border-blue-700'
                >
                  Create
                </Button>
              </form>
            </div>
          </div>
          <div className='w-full md:w-3/5'>
            <h1 className='mt-6 md:-mt-5 text-2xl mb-4'>Preview</h1>
            <div className='p-6 bg-white shadow rounded break-words'>
              <h1 className='font-bold text-4xl md:text-6xl leading-tight'>
                {title || <span className='font-normal text-gray-600'>Title here</span>}
              </h1>
              <div className='flex justify-start space-x-4 mb-2'>
                <p>By {user?.data?.displayName}</p>
                <span>—</span>
                <p>
                {moment().tz('Africa/Tunis').format('L')}
                </p>
              </div>
              <Flex gap="4px 0" wrap="wrap" >
         {     tags.map((el,index)=> <Tag color="magenta" key={index}>{el.value}</Tag>)}
              </Flex>
              <Divider />
              <Markdown source={body} />
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default CreateArticle;
