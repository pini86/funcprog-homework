/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {
    equals,
    prop,
    compose,
    propEq,
    countBy,
    identity,
    values,
    allPass,
    __,
    gte,
    any,
    dissoc,
} from "ramda";

const isRed = equals("red");
const isWhite = equals("white");
const isGreen = equals("green");
const isOrange = equals("orange");
const isBlue = equals("blue");

const getStar = prop("star");
const getTriangle = prop("triangle");
const getSquare = prop("square");
const getCircle = prop("circle");

const numColors = compose(countBy(identity), values);
const allHasColor = (color) => compose(propEq(color, 4), numColors);

const isRedStar = compose(isRed, getStar);
const isGreenSquare = compose(isGreen, getSquare);
const isWhiteTriangle = compose(isWhite, getTriangle);
const isWhiteCircle = compose(isWhite, getCircle);

const greatOrEq2 = gte(__, 2)
const getGreen = prop('green');
const numberOfGreenColors = compose(getGreen, numColors);

const redEqBlue = ({blue, red}) => blue === red;

const isBlueCircle = compose(isBlue, getCircle);
const isOrangeSquare = compose(isOrange, getSquare);

const greatOrEq3 = gte(__, 3)
const greatOrEq3Any = any(greatOrEq3);
const greatOrEq3AnyVal = compose(greatOrEq3Any, values);
const dissocWhite = dissoc('white');
const numColorsWOWhite = compose(dissocWhite, numColors);



// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    isRedStar,
    isGreenSquare,
    isWhiteTriangle,
    isWhiteCircle,
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(greatOrEq2, numberOfGreenColors);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(redEqBlue, numColors);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([isRedStar, isBlueCircle, isOrangeSquare]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(greatOrEq3AnyVal, numColorsWOWhite);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allHasColor("orange");

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
export const validateFieldN9 = allHasColor("green");

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = () => false;
