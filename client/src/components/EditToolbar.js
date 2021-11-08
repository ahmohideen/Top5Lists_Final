import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    let enabledButtonClass = "top5-button";
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    let editStatus = false;
    let undo = true;
    let redo = true;
    if (store.isItemEditActive) {
        editStatus = true;
    }
    if(store.canUndo()){
        undo = false;
    }
    if(store.canRedo()){
        console.log("items to redo...")
        redo = false;
    }
    return (
        <div id="edit-toolbar">
            <Button
                disabled={undo}
                //disabled={undo}
                id='undo-button'
                onClick={handleUndo}
                //className={enabledButtonClass}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button
                disabled={redo}
                //disabled={editStatus}
                id='redo-button'
                onClick={handleRedo}
                //className={enabledButtonClass}
                variant="contained">
                    <RedoIcon />
            </Button>
            <Button 
                disabled={editStatus}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;