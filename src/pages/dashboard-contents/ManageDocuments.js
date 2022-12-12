import React, { useEffect, useState } from 'react'
import {MdDescription, MdLibraryAdd, MdChecklist, MdClose, MdDelete, MdSearch, MdMoreVert} from 'react-icons/md';
import AddDocBox from '../../components/AddDocBox';
import DocumentCardHorizontal from '../../components/DocumentCardHorizontal';
import UserService from '../../services/UserService';
import dateFormatter from '../../helpers/date-formatter';

function ManageDocuments() {

  const [multipleActions, setMultipleActions] = useState(false);
  const [selectedAll , setSelectedAll] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [docBoxVisible, setDocBoxVisible] = useState(false);
  
  const [documents, setDocuments] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const [loading, setLoading] = useState(true);

  const toggleMultipleActions = () => {
    setMultipleActions(!multipleActions);

    if(selectedAll) {
      setSelectedAll(false);
    }
  }

  const selectAllCheckbox = () => {
    setSelectedAll(!selectedAll);

    const checkboxes = document.querySelectorAll('input[name="document"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = !selectedAll;
    });
  }

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);       
  }

  useEffect(() => {
    if(searchInput === '') {
      return setSearchResult(documents);
    }

    const newSearchResult = documents.filter(doc => {
      return doc.title.toLowerCase().includes(searchInput.toLowerCase());
    });
    
    setSearchResult(newSearchResult);
  }, [searchInput, documents]);
  
  useEffect(() => {
    console.log(searchResult)
  }, [searchResult]);


  const clearInput = () => {
    setSearchInput('');
  }

  // reset the search input when new documents are added
  useEffect(() => {
    setSearchResult(documents);
    setSearchInput('');
  },[documents]);


  useEffect(() => {
    setLoading(true);
    try {
      UserService.getAllFileMetadata()
      .then(
        (res)=>{
          setDocuments(res.data.metadata);
          setLoading(false);
      })
    } catch (error) {
      console.log(error)
    }
  }, []);

  return (
    <div className='w-full h-full'>
      <div className='flex flex-row justify-start items-center gap-4'>
        <MdDescription className='text-3xl font-bold flex-shrink-0'/> 
        <h1 className='text-3xl font-bold'>Manage Documents</h1>
      </div>
      {/* button group */}
      <div className='w-full flex flex-col justify-start items-center gap-2 mt-8'>
        {/* Add Document */}
        <div className='w-full flex flex-row justify-start items-center gap-4'>
          <button 
            className='w-full flex flex-row gap-4 justify-center items-center bg-blue-700 text-slate-100 px-4 py-2 rounded-md font-bold shadow-md hover:bg-blue-600 transition-all ease-in-out lg:w-fit'
            onClick={()=>setDocBoxVisible(true)}> <MdLibraryAdd/> Add Document</button>
        </div>
      </div>


      {/* all documents */}
      <div className='w-full h-full flex flex-col justify-start items-start gap-4 mt-8'>
        <h1 className='text-2xl font-bold'>{
          searchInput === '' ? 'All Documents' : `Search Results for "${searchInput}"`
        }</h1>
        {/* search bar */}
        <div className='w-full flex flex-row justify-start items-center gap-2 lg:w-1/2'>
          <MdSearch className="font-bold text-4xl" />
          <input 
            type="text" 
            placeholder='Search for documents' 
            className='w-full h-10 px-4 py-2 rounded-md border-2 border-slate-300 focus:border-slate-700 focus:outline-none'
            value={searchInput}
            onChange={handleSearchInputChange} />
          {
            searchInput && <button 
                              className='w-fit h-fit p-1 text-red-700 rounded-full flex justify-center items-center hover:bg-slate-600 hover:text-red-100 transition-all ease-in-out'
                              onClick={clearInput}> <MdClose className="font-bold text-2xl"/> </button>
          }
        </div>

        {/* button group */}
        <div className='bg-blue-200 w-full flex flex-col justify-start items-center gap-2 mt-4 lg:flex-row lg:items-center lg:justify-start'>
          
          {/* sort */}
          <div className='w-full flex flex-row justify-start items-center gap-4 lg:w-fit'>
            <select
              className='w-full flex flex-row gap-4 justify-center items-center border border-1 border-slate-700 text-slate-700 px-4 py-2 rounded-md font-bold shadow-md transition-all ease-in-out lg:w-fit'>
              <option value="recent">Most recent</option>
              <option value="title_az">Alphabetical (Ascending)</option>
              <option value="title_za">Alphabetical (Descending)</option>

              </select>
          </div>

          {/* toggle multiple actions */}
          <div className='w-full flex flex-row justify-start items-center gap-4 lg:w-fit'>
            <button 
              className='w-full flex flex-row gap-4 justify-center items-center bg-green-700 text-slate-100 px-4 py-2 rounded-md font-bold shadow-md hover:bg-green-600 transition-all ease-in-out lg:w-fit'
              onClick={toggleMultipleActions}><MdChecklist className='flex-shrink-0 text-xl' /> { multipleActions ? "Hide Actions" : "Multiple Actions" }</button>
          </div>

          {/* select all */}
          {
            multipleActions && (
              <div className='w-full flex flex-row justify-start items-center gap-4 lg:w-fit'>
                <input type="checkbox" name="select-all" id="select-all" className='w-5 h-5 cursor-pointer' onClick={selectAllCheckbox}/>
                <label htmlFor="select-all" className='text-lg font-bold text-slate-700'>Select All</label>
              </div>
            )
          }
          {/* delete */}
          {
            multipleActions && (
              <div className='w-full flex flex-row justify-start items-center gap-4 lg:w-fit'>
                <button
                  className='w-full flex flex-row gap-4 justify-center items-center bg-red-700 text-slate-100 px-4 py-2 rounded-md font-bold shadow-md hover:bg-red-600 transition-all ease-in-out lg:w-fit'
                ><MdDelete className='flex-shrink-0 text-xl' /> Delete</button>
              </div>
            )
          }
        </div>

        <div className='w-full h-full overflow-auto lg:h-screen'>
          <table className='table-fixed'>
            <thead>
              <tr className='w-full h-10 bg-slate-100 text-slate-700 text-lg font-bold'>
                <th className='w-1/12 text-center text-sm p-2'>{multipleActions && "Select"}</th>
                <th className='w-1/12 text-center text-sm p-2'>#</th>
                <th className='w-1/12 text-center text-sm p-2'>Title</th>
                <th className='w-1/12 text-center text-sm p-2'>Description</th>
                <th className='w-1/12 text-center text-sm p-2'>Type</th>
                <th className='w-1/12 text-center text-sm p-2'>Size</th>
                <th className='w-1/12 text-center text-sm p-2'>Pub Year</th>
                <th className='w-1/12 text-center text-sm p-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
                {
                  searchResult && searchResult.length > 0 ? 
                   searchResult.map((doc, index) => (
                    <tr key={doc.id} className='w-full h-10 text-slate-700 text-lg'>
                      <td className='w-1/12 text-center'>
                        {
                          multipleActions && (
                            <input type="checkbox" name="document" id={`select-${doc.id}`} className='w-5 h-5 cursor-pointer'/>
                          )
                        }
                      </td>
                      <td className='w-1/12 text-center text-sm p-2'>{doc._id}</td>
                      <td className='w-1/12 text-center text-sm p-2'>{doc.title}</td>
                      <td className='w-1/12 text-center text-sm truncate p-2'>{doc.description}</td>
                      <td className='w-1/12 text-center text-sm p-2'>{doc.type}</td>
                      <td className='w-1/12 text-center text-sm p-2'>{(doc.size / 1e+6).toFixed(2)} MB</td>
                      <td className='w-1/12 text-center text-sm p-2'>{doc.year}</td>
                      <td className='w-1/12 text-center'>
                        <button className='w-10 h-10 bg-slate-100 text-slate-700 rounded-full flex justify-center items-center hover:bg-slate-200 transition-all ease-in-out'>
                          <MdMoreVert className='text-xl' />
                        </button>
                      </td>
                    </tr>
                  ))
                  :
                  <tr className='w-full h-10 text-slate-700 text-lg'>
                    <td className='w-full text-center text-sm p-2' colSpan={8}>No documents found</td>
                  </tr>
                }
            </tbody>
            
          </table>
        </div>
      </div>

      {/* add document box */}
      <AddDocBox visible={docBoxVisible} setVisible={setDocBoxVisible} setDocuments={setDocuments}/>
    </div>
  )
}
export default ManageDocuments