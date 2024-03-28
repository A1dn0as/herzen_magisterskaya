"use client";
import { useState } from "react";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import ContainerValues from "./ContainerValues/ContainerValues";

import { calculateTotalUtility } from "@/utils/fuzzycalc";
import { findOptimalContainerCounts } from "@/utils/fuzzycalc";
import { weightConstraintSatisfied } from "@/utils/fuzzycalc";

import styles from "./ContainerFormRight.module.css";

type TInputData = {
  weight: number;
  utility: {
    min: number;
    modal: number;
    max: number;
  };
};

// TODO: очистка данных, выбирать другие коэфицн

function ContainerFormRigth() {
  const [amount, setAmount] = useState<number>(0);
  const [maxWeight, setMaxWeight] = useState<number>(40);
  const [isAmountButttonActive, setIsAmountButttonActive] =
    useState<boolean>(true);

  const [inputData, setInputData] = useState<TInputData[] | undefined>();

  const handleInputDataChange = (
    weight: number,
    min: number,
    modal: number,
    max: number,
    index?: number
  ) => {
    const newInputDataRecord = {
      weight: weight,
      utility: {
        min: min,
        modal: modal,
        max: max,
      },
    };

    if (index && inputData) {
      setInputData([
        ...inputData.splice(0, index),
        newInputDataRecord,
        ...inputData.splice(index, inputData.length),
      ]);
    } else {
      setInputData([newInputDataRecord]);
    }
  };

  console.log(inputData);

  return (
    <div className={styles.formRightWrapper}>
      <div className={styles.containerAmount}>
        <h2>1. Введите количество контейнеров</h2>

        {(amount <= 0 || Number.isNaN(amount)) && (
          <Alert severity="warning">
            Количество контейнеров должно быть целым числом и больше 0
          </Alert>
        )}

        <TextField
          variant="outlined"
          type="number"
          value={amount}
          disabled={!isAmountButttonActive}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />

        <Button
          variant="contained"
          onClick={() => {
            setAmount(amount);
            setIsAmountButttonActive(!isAmountButttonActive);
          }}
        >
          {isAmountButttonActive ? "Далее" : "Отмена"}
        </Button>
      </div>

      {!isAmountButttonActive && amount > 0 && (
        <div className={styles.containerValues}>
          <h2>2. Укажите полезность и вес контейнеров</h2>
          {Array.from({ length: amount }).map((_, index) => (
            <ContainerValues
              key={index}
              index={index}
              handleInputDataChange={handleInputDataChange}
            />
          ))}
          <Button
            variant="contained"
            disabled={!(inputData && inputData?.length === amount)}
            onClick={() => {
              if (!inputData) return;
              const optimalCounts = findOptimalContainerCounts(inputData, maxWeight);
              let maxUtility = calculateTotalUtility(inputData, optimalCounts);
              console.log(optimalCounts);
              console.log(maxUtility);
            }}
          >
            {"Посчитать"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default ContainerFormRigth;
