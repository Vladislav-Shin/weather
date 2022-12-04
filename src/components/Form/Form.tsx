import React, { useState } from "react";
import Button from "../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { errorHandler, searchCity } from "../Weathers/WeathersSlice";
import classNames from "classnames";

import styles from "./Form.module.scss";

const Form = () => {
  const [text, setText] = useState("");
  const { error } = useSelector((state) => state) as any;
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchCity(text));
    setTimeout(() => {
      dispatch(errorHandler(false));
    }, 2000);
    setText("");
  };

  return (
    <form
      className={classNames(styles.form)}
      onSubmit={handleSubmit}>
      {error ? <div className={classNames(styles.error)}>Вы ввели не правильный город</div> : null}
      <div className={classNames(styles.wrapper)}>
        <input
          className={classNames(styles.input)}
          type="text"
          value={text}
          onChange={onChange}
          placeholder="Поиск Погоды по стране"
        />
      </div>
        <Button className={classNames(styles.btn)}>Search</Button>
    </form>
  );
};

export default Form;
