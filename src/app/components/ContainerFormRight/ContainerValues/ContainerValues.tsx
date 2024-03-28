'use client';

import React, {useState, FC, useEffect} from "react";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";

import styles from "./ContainerValues.module.css";

type ContainerValuesProps = {
    index: number;
    handleInputDataChange: (weight: number, min: number, modal: number, max: number, index?: number) => void
};


const ContainerValues: FC<ContainerValuesProps> = ({ index, handleInputDataChange }) => {

    const [minValue, setMinValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(0);
    const [modalValue, setModalValue] = useState<number>(0);
    const [weightValue, setWeightValue] = useState<number>(0);

    useEffect(()=>{
        if (minValue && maxValue && modalValue && weightValue) {
            handleInputDataChange(weightValue, minValue, modalValue, maxValue, index);
        }
    }, [minValue, maxValue, modalValue, weightValue])


  return (
    <div className={styles.singleContainerValue}>
      <div>
        <h4>{`A${index + 1}`}</h4>
        <TextField variant="outlined" type="number" key={index} value={minValue} onChange={(e) => setMinValue(Number(e.target.value))}/>
      </div>
      <div>
        <h4>{`B${index + 1}`}</h4>
        <TextField variant="outlined" type="number" key={index} value={modalValue} onChange={(e) => setModalValue(Number(e.target.value))}/>
      </div>
      <div>
        <h4>{`E${index + 1}`}</h4>
        <TextField variant="outlined" type="number" key={index} value={maxValue} onChange={(e) => setMaxValue(Number(e.target.value))} />
      </div>

      <div>
        <h4>{`Вес контейнера`}</h4>
        <TextField variant="outlined" type="number" key={index} value={weightValue} onChange={(e) => setWeightValue(Number(e.target.value))}/>
      </div>

    </div>
  );
}

export default ContainerValues;
