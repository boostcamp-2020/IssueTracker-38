import React,{ useState } from 'react';
import LabelInputForm from '../presentational/LabelInputForm';
import DefaultButton from '../../issueDetail/presentational/DefaultButton';
import LabelOrMilestoneButton from '../presentational/LableOrMilestoneButton';

export default function LableMain() {
  const styles = {
    newLabelButton:{
      backgroundColor:'green'
    }
}
const [newLabel,setNewLabel]= useState(0);
const showCreateLabelInput = () =>{
  newLabel?setNewLabel(0):setNewLabel(1)
  return;
}
  return (<>
      <LabelOrMilestoneButton></LabelOrMilestoneButton>
      <DefaultButton text='New Label' onClick={showCreateLabelInput} extraStyle={styles.newLabelButton}></DefaultButton>
      {newLabel
        ?<LabelInputForm saveText='Create Label' onClick={showCreateLabelInput}></LabelInputForm>
        :<div></div>}
    </>
  );
}
