import { Dialog, DialogContent }from "@mui/material";

export default function Popup(props) {
    const {title, children, openPopup, closePopup} = props;

    return (
        <Dialog open={openPopup} onClose={closePopup} >
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}