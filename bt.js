var input = [
  {
    id: 1,
    name: "Man",
    children: [
      {
        id: 2,
        name: "Hai",
        children: [
          {
            id: 3,
            name: "Phuc",
            children: [
              {
                id: 4,
                name: "Khai",
                children: [
                  {
                    id: 5,
                    name: "Khai 1",
                    children: [
                      {
                        id: 6,
                        name: "Khai 2",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 7,
        name: "Nguyen",
        children: [
          {
            id: 8,
            name: "ABC",
          },
        ],
      },
    ],
  },
];

//INPUT: Array, id
//OUTPUT: name

const solution = (id) => {
  const recursion = (array) => {
    for (let ele of array) {
      // console.log(ele.name);
      if (ele.id === id) {
        return ele.name;
      } else if (ele.children) {
        const res = recursion(ele.children);
        if (res) {
          return res;
        }
      }
    }
  };
  const result = recursion(input);
  if (result) {
    console.log("KQ: ", result);
  } else {
    console.log("KQ: ", "Not Found");
  }
};

solution(6);
