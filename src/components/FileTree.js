import React, { useState } from 'react';
import '../styles/FileTree.css'
import { transferBytesFormat, hideFileFormat } from "./Files";
import { FileTwoTone, FolderOpenTwoTone ,FolderTwoTone, RightOutlined, DownOutlined} from '@ant-design/icons';

function FileTree(props){
    const {data, name, type, size} = props
    const [isShow,setIsShow] = useState(false)
    const handleClick = (e)=>{
        setIsShow(()=> !isShow)
        e.stopPropagation();
    }

    return (
        <div>
            <ul>
                <li onClick={handleClick}>
                    <div>
                        <div className={"folder-content"}>
                            <div className={type === "folder"? "folder" : "hiden"}>
                                <div className={"icon-style"}>
                                    { isShow? <DownOutlined /> : <RightOutlined /> }
                                </div>
                            </div>
                            <div className="file">
                                <div className={"icon-style icon-size"}>
                                    {type === "folder"? isShow? <FolderOpenTwoTone /> : <FolderTwoTone /> : <FileTwoTone />}
                                </div>
                            </div>
                            <span>
                                { type === "folder"? name : hideFileFormat(name)+ " " + transferBytesFormat(size) }
                            </span>
                        </div>
                    </div>
            {data.length?
                data.map((item,index) =>{
                    return (<div className={ isShow? "active" : "hiden" } key={index}>
                                    { item.children?.length?
                                    <FileTree data={item.children} name={item.name} type={item.type}/> :
                                    <FileTree data={[]} name={item.name} type={item.type} size={item.size}/> }
                            </div>)}) : null
            }
                </li>
            </ul>
        </div>
    );
}

export default FileTree;
