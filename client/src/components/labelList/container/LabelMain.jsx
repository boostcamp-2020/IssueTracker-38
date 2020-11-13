import React, { useState } from 'react';
import LabelInputForm from '../presentational/LabelInputForm';
import NewLabelButton from '../presentational/NewLabelButton';
import LabelOrMilestoneButton from '../presentational/LableOrMilestoneButton';
import { useInput } from '../../../hooks/hooks';
import { getRandomColorCode } from '../../../utils/utils';
import { labelAPI } from '../../../apis/api';
import LabelList from './LabelList';
import DisplayFlex from '../layouts/DisplayFlex';

export default function LableMain() {
  const [newLabel, setNewLabel] = useState(0);
  const [labelName, setLabelName] = useInput('');
  const [labelColor, setLabelColor] = useState(getRandomColorCode());
  const [labelDescription, setLabelDescription] = useInput('');

  const labelData = {
    name: labelName,
    color: labelColor,
    description: labelDescription,
  };
  const showCreateLabelInput = () => (newLabel ? setNewLabel(0) : setNewLabel(1));
  const makeRandomColor = () => {
    setLabelColor(getRandomColorCode());
  };
  const onChangeColor = (e) => {
    setLabelColor(e.target.value);
  };
  const createLabel = async () => {
    await labelAPI.create(labelData);
    showCreateLabelInput();
  };

  return (
    <>
      <DisplayFlex>
        <LabelOrMilestoneButton />
        <NewLabelButton
          title="New Label"
          onClick={showCreateLabelInput}
        />
      </DisplayFlex>
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
            onCancel={showCreateLabelInput}
          />
        )
        : <div />}
      <LabelList />
    </>
  );
}
