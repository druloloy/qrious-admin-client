// import React from 'react'
// import AddDocBoxLoading from '../loading/AddDocBoxLoading'

// function DocumentDetails() {
//   const [loading, setLoading] = React.useState(false); 
//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-slate-900 text-slate-900 bg-opacity-80 shadow-2xl z-50">
//           {
//             loading ? <AddDocBoxLoading setUploading={setLoading} isCancelled={isCancelled}/> 
//             : 
//             (
//               <div 
//                 className="relative flex flex-col justify-start items-start gap-4 top-0 left-1/2 w-full h-5/6 bg-slate-100 shadow-2xl z-50 -translate-x-1/2 rounded-2xl p-4 lg:w-1/2 lg:h-5/6 lg:top-1/2 lg:-translate-y-1/2">
//                 {/* close button */}
//                 <div className="absolute top-2 right-2">
//                   <button onClick={() => setVisible(false)}>
//                     <MdClose className="font-bold text-2xl text-slate-900" />
//                   </button>
//                 </div>
//                 {/* content title */}
//                 <h1 className='font-bold text-2xl'>Add a Document</h1>


//                 <form 
//                   className='w-full h-full flex flex-col gap-3 p-4 overflow-y-scroll'>

//                   {/* file upload */}
//                   <div className='flex flex-col gap-2 h-24'>
//                     <label className='font-bold text-lg'>Drag File or Select File</label>
//                     <input  
//                       type='file' 
//                       className='w-full h-full' 
//                       name='document_upload' 
//                       accept="application/pdf" />
//                   </div>
//                   {/* document title */}
//                   <div className='flex flex-col gap-2'>
//                     <label className='font-bold text-lg'>Title</label>
//                     <input 
//                       className='border-2 border-slate-900 rounded-lg p-2' 
//                       type='text' 
//                       value={docTitle}  
//                       placeholder='Document Title'
//                       required={true}
//                       />
//                   </div>

//                   {/* document authors */}
//                   <div className='flex flex-col gap-2'>
//                     <label className='font-bold text-lg'>Authors</label>
//                     <div className='flex flex-col gap-2'>
//                       {
//                         docAuthors.map((author, index) => (
//                           <div key={index} className='flex flex-row items-center gap-2'>
//                             <input
//                               className='flex-1 border-2 border-slate-900 rounded-lg p-2'
//                               type='text'
//                               value={author}
//                               placeholder='Author Name'
//                               required={true}
//                               autoComplete='off'
//                             />
//                             {
//                               index > 0 && (
//                                 <MdClose className='text-2xl cursor-pointer' onClick={()=>removeAuthorInput(index) }/>
//                               )
//                             }
//                           </div>
//                         ))
//                       }
//                     </div>
//                     <button 
//                       className='text-slate-900 rounded-lg p-2 font-bold text-left flex flex-row items-center gap-2'
//                       onClick={addMoreAuthorsInput}> <MdPersonAdd className='text-slate-900 text-2xl' /> Add More Author</button>
//                   </div>
//                   {/* Year published */}
//                 <div className='flex flex-col gap-2'>
//                     <label className='font-bold text-lg'>Year</label>
//                     <input
//                       className='border-2 border-slate-900 rounded-lg p-2'
//                       type='number'
//                       max={new Date().getFullYear()}
//                       min={1960}
//                       value={docYear}
//                       placeholder='Year Published'
//                       onChange={(e) => setDocYear(e.target.value)}
//                       required={false}
//                       autoComplete='off'
//                     />
//                   </div>
//                   {/* publisher */}
//                   <div className='flex flex-col gap-2'>
//                     <label className='font-bold text-lg'>Publisher</label>
//                     <input
//                       className='border-2 border-slate-900 rounded-lg p-2'
//                       type='text'
//                       value={docPublisher}
//                       placeholder='Publisher'
//                       onChange={(e) => setDocPublisher(e.target.value)}
//                       required={false}
//                       autoComplete='off'
//                     />
//                   </div>
//                   {/* document abstract or description */}
//                   <div className='flex flex-col gap-2'>
//                     <label className='font-bold text-lg'>Abstract</label>
//                     <textarea
//                       className='border-2 border-slate-900 rounded-lg p-2'
//                       type='text'
//                       rows={5}
//                       value={docAbstract}
//                       placeholder='Abstract/Description'
//                       onChange={(e) => setDocAbstract(e.target.value)}
//                       required={false}
//                       autoComplete='off'
//                     />
//                   </div>

//                   <div className='flex flex-col gap-2'>
//                     <label className='font-bold text-lg'>Tags</label>
//                     <input
//                       className='border-2 border-slate-900 rounded-lg p-2'
//                       type='text'
//                       value={docTags}
//                       placeholder='Tags (Separate words with a comma ",")'
//                       onChange={(e) => setDocTags(e.target.value)}
//                       required={true}
//                       autoComplete='off'
//                     />
//                   </div>
//                   <button className='bg-blue-700 text-slate-100 rounded-lg p-2 font-bold mt-5'>Add Document</button>
//                 </form>
//               </div>
//             )
//           }
//       </div> 
//   )
// }

// export default DocumentDetails