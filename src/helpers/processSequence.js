/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */

import {
    __,
    assoc,
    length,
    pipe,
    prop,
    allPass,
    otherwise,
    partial,
    tap,
    andThen,
    gte,
    lt,
    test,
    ifElse,
} from "ramda";
import Api from "../tools/api";

const api = new Api();

const NUMBERS = "https://api.tech/numbers/base";
const ANIMALS = "https://animals.tech/";
const NUMBER_PARAMS = {
    from: 10,
    to: 2,
};

const toSquare = (num) => num * num;
const restFromDivByThree = (num) => num % 3;

const responseToString = pipe(prop("result"), String);

const addParamForNumbers = assoc("number", __, NUMBER_PARAMS);

const apiGetNumberBinaryBase = pipe(addParamForNumbers, api.get(NUMBERS));
const apiGetAnimal = (val) => api.get(ANIMALS + String(val), {});

const greaterThenTwo = pipe(length, gte(__, 2));
const lessThanTen = pipe(length, lt(__, 10));
const regexTest = test(/^\d+(.\d+)?$/);

const isValid = allPass([greaterThenTwo, lessThanTen, regexTest]);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    const writeToLog = tap(writeLog);
    const writeRespToLog = andThen(writeToLog);
    const handleValidationError = partial(handleError, ["ValidationError"]);
    const onSuccess = andThen(handleSuccess);
    const onError = otherwise(handleError);
    const sequence = pipe(
        writeToLog,
        apiGetNumberBinaryBase,
        andThen(responseToString),
        writeRespToLog,
        andThen(length),
        writeRespToLog,
        andThen(toSquare),
        writeRespToLog,
        andThen(restFromDivByThree),
        writeRespToLog,
        andThen(apiGetAnimal),
        andThen(responseToString),
        writeRespToLog,
        onSuccess,
        onError
    );
    const checkInput = ifElse(isValid, sequence, handleValidationError);
    checkInput(value);
};

export default processSequence;
