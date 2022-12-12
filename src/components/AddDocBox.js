import React, { useEffect, useState } from 'react'
import {MdClose,MdPersonAdd} from 'react-icons/md'
import {toast} from 'react-toastify'
import AddDocBoxLoading from '../loading/AddDocBoxLoading';
import UserService from '../services/UserService';

function AddDocBox({visible, setVisible, setDocuments}) {
    const authorsRef = React.createRef();
    const [docTitle, setDocTitle] = useState('');
    const [docAuthors, setDocAuthors] = useState(['']);
    const [docYear, setDocYear] = useState('');
    const [docPublisher, setDocPublisher] = useState('');
    const [docAbstract, setDocAbstract] = useState('');
    const [docTags, setDocTags] = useState('');

    const [cancelled, isCancelled] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [controller, setController] = useState(new AbortController());
    const [file, setFile] = useState(null);

    useEffect(() => {
      // escape button closes the modal
      const handleEscape = (e) => {
        if(e.key === 'Escape') {
          setVisible(false);
        }
      }
      window.addEventListener('keydown', handleEscape);
      return () => {
        window.removeEventListener('keydown', handleEscape);
      }
    }, [setVisible]);
    

    const onFileChange = (e) => {
        const newFile = [...e.target.files][0];
        const fileSize = newFile?.size / 1024 / 1024; // in MiB

        // file size should be less than 25mb
        if(fileSize > 50){
            toast.error('File size should be less than 25mb!');
            try{
                e.target.value = null;
            }catch(error){}
            return;
        }
        else setFile(newFile); 
    }

    const onAuthorChange = (e, index) => {
      console.log(docAuthors);
      const newAuthors = [...docAuthors];
      newAuthors[index] = e.target.value;
      setDocAuthors(newAuthors);
    }

    const addMoreAuthorsInput = () => {
      setDocAuthors([...docAuthors, '']);
    }

    const removeAuthorInput = (index) => {
      const newAuthors = [...docAuthors];
      newAuthors.splice(index, 1);
      setDocAuthors(newAuthors);
    }

    const uploadDocument = async (e) => {
      e.preventDefault();
      setUploading(true);


      try {
        const data = {
          title: docTitle,
          year: docYear,
          publisher: docPublisher,
          description: docAbstract,
          tags: docTags,
          document_upload: file
        }
        // to form data
        const formData = new FormData();
        Object.keys(data).forEach(key => {
          formData.append(key, data[key]);
        });

        // add author array
        for(let i = 0; i < docAuthors.length; i++){
          formData.append('authors[]', docAuthors[i]);
        }

        await UserService.uploadDocument(formData, controller)
        .then((res)=>{
          toast.success('Document uploaded successfully!');
          setDocuments((docs)=>[...docs, res.data.metadata]);
          setVisible(false);
          isCancelled(true);
          setUploading(false);
        })
      } catch (error) {

          isCancelled(true);
          setUploading(false);
          toast.error(error.response?.data.error);
      
      }
    }

    useEffect(() => {
      // abort if not uploading
      if(!uploading && cancelled){
        controller.abort();
        setController(new AbortController());
        isCancelled(false);
        setUploading(false);
      }
    },[uploading, controller, cancelled]);

    return visible && (
      <div className="fixed top-0 left-0 w-full h-full bg-slate-900 text-slate-900 bg-opacity-80 shadow-2xl z-50">
          {
            uploading ? <AddDocBoxLoading setUploading={setUploading} isCancelled={isCancelled}/> 
            : 
            (
              <div 
                className="relative flex flex-col justify-start items-start gap-4 top-0 left-1/2 w-full h-5/6 bg-slate-100 shadow-2xl z-50 -translate-x-1/2 rounded-2xl p-4 lg:w-1/2 lg:h-5/6 lg:top-1/2 lg:-translate-y-1/2">
                {/* close button */}
                <div className="absolute top-2 right-2">
                  <button onClick={() => setVisible(false)}>
                    <MdClose className="font-bold text-2xl text-slate-900" />
                  </button>
                </div>
                {/* content title */}
                <h1 className='font-bold text-2xl'>Add a Document</h1>


                <form 
                  className='w-full h-full flex flex-col gap-3 p-4 overflow-y-scroll'
                  onSubmit={uploadDocument}>

                  {/* file upload */}
                  <div className='flex flex-col gap-2 h-24'>
                    <label className='font-bold text-lg'>Drag File or Select File</label>
                    <input  
                      type='file' 
                      className='w-full h-full' 
                      name='document_upload' 
                      onChange={onFileChange}
                      accept="application/pdf" />
                  </div>
                  {/* document title */}
                  <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg'>Title</label>
                    <input 
                      className='border-2 border-slate-900 rounded-lg p-2' 
                      type='text' 
                      value={docTitle}  
                      placeholder='Document Title'
                      onChange={(e) => setDocTitle(e.target.value)}
                      required={true}
                      />
                  </div>

                  {/* document authors */}
                  <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg'>Authors</label>
                    <div ref={authorsRef} className='flex flex-col gap-2'>
                      {
                        docAuthors.map((author, index) => (
                          <div key={index} className='flex flex-row items-center gap-2'>
                            <input
                              className='flex-1 border-2 border-slate-900 rounded-lg p-2'
                              type='text'
                              value={author}
                              placeholder='Author Name'
                              onChange={(e) => onAuthorChange(e, index)}
                              required={true}
                              autoComplete='off'
                            />
                            {
                              index > 0 && (
                                <MdClose className='text-2xl cursor-pointer' onClick={()=>removeAuthorInput(index) }/>
                              )
                            }
                          </div>
                        ))
                      }
                    </div>
                    <button 
                      className='text-slate-900 rounded-lg p-2 font-bold text-left flex flex-row items-center gap-2'
                      onClick={addMoreAuthorsInput}> <MdPersonAdd className='text-slate-900 text-2xl' /> Add More Author</button>
                  </div>
                  {/* Year published */}
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg'>Year</label>
                    <input
                      className='border-2 border-slate-900 rounded-lg p-2'
                      type='number'
                      max={new Date().getFullYear()}
                      min={1960}
                      value={docYear}
                      placeholder='Year Published'
                      onChange={(e) => setDocYear(e.target.value)}
                      required={false}
                      autoComplete='off'
                    />
                  </div>
                  {/* publisher */}
                  <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg'>Publisher</label>
                    <input
                      className='border-2 border-slate-900 rounded-lg p-2'
                      type='text'
                      value={docPublisher}
                      placeholder='Publisher'
                      onChange={(e) => setDocPublisher(e.target.value)}
                      required={false}
                      autoComplete='off'
                    />
                  </div>
                  {/* document abstract or description */}
                  <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg'>Abstract</label>
                    <textarea
                      className='border-2 border-slate-900 rounded-lg p-2'
                      type='text'
                      rows={5}
                      value={docAbstract}
                      placeholder='Abstract/Description'
                      onChange={(e) => setDocAbstract(e.target.value)}
                      required={false}
                      autoComplete='off'
                    />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg'>Tags</label>
                    <input
                      className='border-2 border-slate-900 rounded-lg p-2'
                      type='text'
                      value={docTags}
                      placeholder='Tags (Separate words with a comma ",")'
                      onChange={(e) => setDocTags(e.target.value)}
                      required={true}
                      autoComplete='off'
                    />
                  </div>
                  <button className='bg-blue-700 text-slate-100 rounded-lg p-2 font-bold mt-5'>Add Document</button>
                </form>
              </div>
            )
          }
      </div> 
  )
}

export default AddDocBox