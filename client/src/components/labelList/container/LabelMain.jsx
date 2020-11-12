import React, { useState, useContext } from 'react';
import LabelInputForm from '../presentational/LabelInputForm';
import DefaultButton from '../../issueDetail/presentational/DefaultButton';
import LabelOrMilestoneButton from '../presentational/LableOrMilestoneButton';
import { useInput } from '../../../hooks/hooks';
import { getRandomColorCode } from '../../../utils/utils';
import { labelAPI } from '../../../apis/api';
import { LabelStore, LabelsContext } from '../../../stores/LabelStore';
import LabelList from './LabelList';

const styles = {
  newLabelButton: {
    backgroundColor: 'green',
  },
};

export default function LableMain() {
  const [newLabel, setNewLabel] = useState(0);
  const [labelName, setLabelName] = useInput('');
  const [labelColor, setLabelColor] = useState(getRandomColorCode());
  const [labelDescription, setLabelDescription] = useInput('');
  const { dispatch } = useContext(LabelsContext);

  const labelData = {
    name: labelName,
    color: labelColor,
    description: labelDescription,
  };
  const showCreateLabelInput = () => {
    newLabel ? setNewLabel(0) : setNewLabel(1);
  };
  const makeRandomColor = () => {
    setLabelColor(getRandomColorCode());
  };
  const onChangeColor = (e) => {
    setLabelColor(e.target.value);
  };
  const createLabel = async () => {
    const result = await labelAPI.create(labelData);
    dispatch({ type: 'ADD', payload: result });
  };
  const onCancel = () =>{
    newLabel ? setNewLabel(0) : setNewLabel(1);
  }
  return (
    <>
      <LabelOrMilestoneButton />
      <DefaultButton text="New Label" onClick={showCreateLabelInput} extraStyle={styles.newLabelButton} />
      {newLabel
        ? (
          <LabelInputForm
            labelName={labelName}
            description={labelDescription}
            color={labelColor}
            saveText="Create Label"
            onClick={makeRandomColor}
            onChangeName={setLabelName}
            onChangeDescription={setLabelDescription}
            onChangeColor={onChangeColor}
            onSave={createLabel}
            onCancel={onCancel}
          />
        )
        : <div />}
      <LabelList />
    </>
  );
}
