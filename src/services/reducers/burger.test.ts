import {
  burgerConstructorInitialState,
  burgerConstructorReducer,
  burgerIngredientsInitialState,
  burgerIngredientsReducer,
  ingredientModalInitialState,
  ingredientModalReducer,
  orderInitialState,
  orderReducer
} from './burger'
import {
  ADD_INGREDIENT,
  CLEAR_CONSTRUCTOR_LIST,
  CLEAR_INGREDIENT_COUNTERS,
  CLOSE_ORDER_MODAL,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DECREMENT_INGREDIENT_COUNTER,
  FETCH_INGREDIENTS_ERROR,
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  INCREMENT_INGREDIENT_COUNTER,
  REMOVE_INGREDIENT,
  REMOVE_INGREDIENT_FROM_MODAL,
  SET_INGREDIENT_FOR_MODAL,
  UPDATE_CONSTRUCTOR_LIST
} from '../actions/burger'
import {
  BurgerConstructorAction,
  BurgerIngredientsAction,
  IngredientModalAction,
  OrderAction
} from '../../utils/types/actions/burger'
import { Ingredient, IngredientType, WithDragId } from '../../utils/types/common'

const mainIngredient: WithDragId<Ingredient> = {
  _id: '1',
  name: 'Котлета',
  type: IngredientType.MAIN,
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: '',
  image_mobile: '',
  image_large: '',
  dragId: 0
}
const bun: WithDragId<Ingredient> = {
  ...mainIngredient,
  _id: '2',
  dragId: 1,
  type: IngredientType.BUN
}

describe('BurgerIngredientsReducer Tests', () => {
  it('should handle FETCH_INGREDIENTS_REQUEST', () => {
    const action: BurgerIngredientsAction = { type: FETCH_INGREDIENTS_REQUEST }
    const initialState = { ...burgerIngredientsInitialState }

    expect(burgerIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      ingredientsRequest: true
    })
  })

  it('should handle FETCH_INGREDIENTS_SUCCESS', () => {
    const ingredients = [mainIngredient, bun]
    const action: BurgerIngredientsAction = { type: FETCH_INGREDIENTS_SUCCESS, ingredients }
    const initialState = { ...burgerIngredientsInitialState }

    expect(burgerIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      ingredientsError: false,
      ingredientsRequest: false,
      ingredients: ingredients
    })
  })

  it('should handle FETCH_INGREDIENTS_ERROR', () => {
    const action: BurgerIngredientsAction = { type: FETCH_INGREDIENTS_ERROR }
    const initialState = { ...burgerIngredientsInitialState }

    expect(burgerIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      ingredientsError: true,
      ingredientsRequest: false,
    })
  })

  it('should handle INCREMENT_INGREDIENT_COUNTER for bun', () => {
    const action: BurgerIngredientsAction = { type: INCREMENT_INGREDIENT_COUNTER, ingredient: bun }
    const initialState = { ...burgerIngredientsInitialState }

    expect(burgerIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      ingredientCounters: { '2': 2 }
    })
  })

  it('should handle INCREMENT_INGREDIENT_COUNTER for other ingredient types', () => {
    const action: BurgerIngredientsAction = { type: INCREMENT_INGREDIENT_COUNTER, ingredient: mainIngredient }
    const initialState = { ...burgerIngredientsInitialState, ingredientCounters: { '1': 1 } }

    expect(burgerIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      ingredientCounters: { '1': 2 }
    })
  })

  it('should handle DECREMENT_INGREDIENT_COUNTER', () => {
    const id = '1'
    const action: BurgerIngredientsAction = { type: DECREMENT_INGREDIENT_COUNTER, id }
    const initialState = { ...burgerIngredientsInitialState, ingredientCounters: { '1': 2 } }

    expect(burgerIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      ingredientCounters: { '1': 1 }
    })
  })

  it('should handle CLEAR_INGREDIENT_COUNTERS', () => {
    const action: BurgerIngredientsAction = { type: CLEAR_INGREDIENT_COUNTERS }
    const initialState = { ...burgerIngredientsInitialState, ingredientCounters: { '1': 1 } }

    expect(burgerIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      ingredientCounters: {}
    })
  })
})

describe('IngredientModalReducer Tests', () => {
  it('should handle SET_INGREDIENT_FOR_MODAL', () => {
    const action: IngredientModalAction = { type: SET_INGREDIENT_FOR_MODAL, ingredient: mainIngredient }
    const initialState = {...ingredientModalInitialState}

    expect(ingredientModalReducer(initialState, action)).toEqual({
      ...initialState,
      current: mainIngredient
    })
  })

  it('should handle REMOVE_INGREDIENT_FROM_MODAL', () => {
    const action: IngredientModalAction = { type: REMOVE_INGREDIENT_FROM_MODAL }
    const initialState = {...ingredientModalInitialState, current: mainIngredient}

    expect(ingredientModalReducer(initialState, action)).toEqual({
      ...initialState,
      current: null
    })
  })
})

describe('BurgerConstructorReducer Tests', () => {
  it('should handle ADD_INGREDIENT for bun', () => {
    const action: BurgerConstructorAction = { type: ADD_INGREDIENT, ingredient: bun }
    const initialState = {...burgerConstructorInitialState}

    expect(burgerConstructorReducer(initialState, action)).toEqual({
      ...initialState,
      bun
    })
  })

  it('should handle ADD_INGREDIENT for main ingredient', () => {
    const action: BurgerConstructorAction = { type: ADD_INGREDIENT, ingredient: mainIngredient }
    const initialState = {...burgerConstructorInitialState}

    expect(burgerConstructorReducer(initialState, action)).toEqual({
      ...initialState,
      mainIngredients: [...initialState.mainIngredients, mainIngredient]
    })
  })

  it('should handle REMOVE_INGREDIENT', () => {
    const action: BurgerConstructorAction = { type: REMOVE_INGREDIENT, id: 0 }
    const initialState = {...burgerConstructorInitialState, mainIngredients: [mainIngredient]}

    expect(burgerConstructorReducer(initialState, action)).toEqual({
      ...initialState,
      mainIngredients: []
    })
  })

  it('should handle UPDATE_CONSTRUCTOR_LIST', () => {
    const newMainIngredients = [
      mainIngredient,
      {
        ...mainIngredient,
        dragId: 2,
        _id: '2'
      }
    ]
    const action: BurgerConstructorAction = { type: UPDATE_CONSTRUCTOR_LIST, newMainIngredients }
    const initialState = {...burgerConstructorInitialState, mainIngredients: [mainIngredient]}

    expect(burgerConstructorReducer(initialState, action)).toEqual({
      ...initialState,
      mainIngredients: newMainIngredients
    })
  })

  it('should handle CLEAR_CONSTRUCTOR_LIST', () => {
    const action: BurgerConstructorAction = { type: CLEAR_CONSTRUCTOR_LIST }
    const initialState = {
      ...burgerConstructorInitialState,
      bun,
      mainIngredients: [mainIngredient]
    }

    expect(burgerConstructorReducer(initialState, action)).toEqual({
      ...initialState,
      bun: null,
      mainIngredients: []
    })
  })
})

describe('OrderReducer Tests', () => {
  it('should handle CREATE_ORDER_REQUEST', () => {
    const action: OrderAction = { type: CREATE_ORDER_REQUEST };
    const initialState = {...orderInitialState};

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      createOrderRequest: true
    });
  });

  it('should handle CREATE_ORDER_SUCCESS', () => {
    const action: OrderAction = { type: CREATE_ORDER_SUCCESS, createdOrder: 1234 };
    const initialState = {...orderInitialState};

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      createOrderError: false,
      createOrderRequest: false,
      createdOrder: 1234
    });
  });

  it('should handle CREATE_ORDER_ERROR', () => {
    const action: OrderAction = { type: CREATE_ORDER_ERROR };
    const initialState = {...orderInitialState};

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      createOrderError: true,
      createOrderRequest: false,
      createdOrder: null
    });
  });

  it('should handle CLOSE_ORDER_MODAL', () => {
    const action: OrderAction = { type: CLOSE_ORDER_MODAL };
    const initialState = {...orderInitialState, createdOrder: 1234};

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      createdOrder: null
    });
  });
});