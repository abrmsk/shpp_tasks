import React, { useState } from "react";
import { ReviewFormProps } from "./ReviewForm.props";
import cn from "classnames";
import styles from "./ReviewForm.module.css";
import { Button, Input, Rating, Textarea } from "..";
import CloseIcon from './close.svg';
import { useForm, Controller } from "react-hook-form";
import { IReviewForm, IReviewSendResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "../../helpers/api";


export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSendResponse>(API.review.createDemo, { ...formData, productId });
      if (data.message) {
        setIsSuccess(true);
        reset();

      } else {
        setIsError('Что-то пошло не так');
      }
    } catch(e) {
      setIsError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} { ...props }>
        <Input
          placeholder="Имя"
          { ...register('name', { required: { value: true, message: 'Заполните имя' }}) }
          error={errors.name}
        />

        <Input
          className={styles.title}
          placeholder="Заголовок отзыва"
          { ...register('title', { required: { value: true, message: 'Заполните заголовок' }})}
          error={errors.title}
        />

        <div className={styles.rating}>
          <span>Оценка: </span>
          <Controller
            control={control}
            name='rating'
            rules={{ ...register('rating', { required: { value: true, message: 'Укажите рейтинг' }})}}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}
                // { ...register('rating', { required: { value: true, message: 'Укажите рейтинг' }})}
                error={errors.rating}
              />
            )}
          />
          
        </div>

        <Textarea
          className={styles.description}
          placeholder="Текст отзыва"
          { ...register('description', { required: { value: true, message: 'Заполните описание отзыва' }}) }
          error={errors.description}
        />

        <div className={styles.submit}>
          <Button appearance="primary">Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>

      {isSuccess && <div className={cn(styles.panel, styles.success)}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div className={styles.infoTxt}>Спасибо, Ваш отзыв будет опубликован после проверки.</div>
        <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)} />
      </div>}
      {isError && <div className={cn(styles.panel, styles.error)}>
        <div className={styles.errorTitle}>Что-то пошло не так. Попробуйте обновить страницу.</div>
        <CloseIcon className={styles.close} onClick={() => setIsError(undefined)} />
      </div>}
    </form>
  );
};
