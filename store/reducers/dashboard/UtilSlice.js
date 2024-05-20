import items from "@/constant/dashbord/items";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    isThLarge: true,
    isThList: false,
    //open close modal in customer
    isSearch:false,
    isCartItemModal:false,
    isCreateAddressModal:false,
    isUpdateAddressModal:false,
    isCommentModal:false,
    isSidebarOpen:false,
 //end
    

    isUpdate : null,
    openDrawer: false,
    isOpenModal: false,
    openDropDown: {
        index: null,
    },
    items: items,
    page: 1,
    search: '',
    perPage: 0,
    isLoading: null,
    isError: null,
    length: null,
    isSuccess: null,
    deleteID: null,
    deleteName: null,
    errorData: null,
    isIdAddress:null,
    successMessage: ''
}

const UtilSlice = createSlice({
    name: 'util',
    initialState: initialState,
    reducers: {
        setIsThLarge: (state, action) => {
            if (action.payload === true) {
                state.isThLarge = action.payload;
                state.isThList = false
            } else {
                state.isThLarge = true
                state.isThList = false
            }


        },
        setIsThList: (state, action) => {
            if (action.payload === true) {
                state.isThList = action.payload;
                state.isThLarge = false
            } else {
                state.isThLarge = false
                state.isThList = true
            }

        },
        drawerOpneClose: (state, action) => {
            return {
                ...state,
                openDrawer: action.payload,
            };
        },
        modalOpenClose: (state, action) => {
            return {
                ...state,
                isOpenModal: action.payload,
            }
        },
        drawerOpenDropDown: (state, action) => {

            const [getopenDropDown, index, subIndex, id] = action.payload;

            state.openDropDown.index = index;
            //  console.log( 'id' , id);
            //  console.log( 'index' , index );



            if (state.items[index]) {
                if (id === state.items[index].id) {
                    state.items[index].openDropDown = getopenDropDown;
                    // console.log( 'item' , id === state.items[index].id);
                }
            }
            if (state.items[index].children[subIndex]) {
                if (id === state.items[index].children[subIndex].id) {
                    state.items[index].children[subIndex].openDropDown = getopenDropDown;
                    // console.log( 'subitem' , id === state.items[index].children[subIndex].id);
                }
            }

        },

        setPage: (state, action) => {
            state.page = action.payload;

        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setPerPage: (state, action) => {
            if (state.page !== 1) {
                state.page = 1;
                state.perPage = action.payload;

            } else {
                state.perPage = action.payload;
            }


        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setIsError: (state, action) => {
            state.isError = action.payload;
        },
        setIsSuccess: (state, action) => {
            state.isSuccess = action.payload;
        },
        setItemLength: (state, action) => {
            state.length = action.payload;
        },
        setHandlerModal: (state, action) => {
            const [name, id] = action.payload;

            state.deleteID = id;
            state.deleteName = name;


        },
        setErrorData: (state, action) => {
            state.errorData = action.payload;
        },
        setSuccessMessage: (state, action) => {
            state.successMessage = action.payload;
        },

        setUpdateInfo: (state, action) => {
            state.isUpdate = action.payload;
        },
        setUpdateAddress: (state, action) => {
            state.isIdAddress = action.payload;
        },

        // open colse modal reducer in customer
        setIsSearch: (state, action) => {
            state.isSearch = action.payload;
        },
         setIsCartItemModal: (state, action) => {
            console.log(action);
            state.isCartItemModal = action.payload;
        },

        setIsCreateAddressModal: (state, action) => {
            state.isCreateAddressModal = action.payload;
        },
        setIsUpdateAddressModal: (state, action) => {
            state.isUpdateAddressModal = action.payload;
        },
        setIsCommentModal: (state, action) => {
            state.isCommentModal = action.payload;
        },
        setSidebarOpen: (state, action) => {
            console.log(action);
            state.isSidebarOpen = action.payload;
        },
       
   
      
    }
});

export const UtilReducer = UtilSlice.reducer;
export const { drawerOpneClose,
    setIsThLarge,
    setIsThList,
    modalOpenClose,
    drawerOpenDropDown,
    setPage,
    setSearch,
    setPerPage,
    setIsError,
    setIsLoading,
    setIsSuccess,
    setHandlerModal,
    setItemLength,
    setErrorData,
    setSuccessMessage,
    setUpdateInfo,
    setUpdateAddress,
    // open close modal in customer
    setIsSearch,
    setIsCartItemModal,
    setIsCreateAddressModal,
    setIsUpdateAddressModal,
    setIsCommentModal,
    setSidebarOpen
    // search coustomer
   

} = UtilSlice.actions;