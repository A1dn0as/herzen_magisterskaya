type TInputData = {
    weight: number;
    utility: {
      min: number;
      modal: number;
      max: number;
    }
  };


export function calculateTotalUtility(containers: TInputData[], containerCounts: number[]) {
    let totalUtility = 0;
    for (let i = 0; i < containers.length; i++) {
        totalUtility += containerCounts[i] * (
            containers[i].utility.min +
            containers[i].utility.modal +
            containers[i].utility.max
        ) / 3;
    }
    return totalUtility;
}

// Функция для проверки ограничения на грузоподъемность
export function weightConstraintSatisfied(containers: TInputData[], containerCounts: number[], maxWeight: number) {
    let totalWeight = 0;
    for (let i = 0; i < containers.length; i++) {
        totalWeight += containerCounts[i] * containers[i].weight;
    }
    return totalWeight <= maxWeight;
}

// Функция для поиска оптимального количества контейнеров каждого типа
export function findOptimalContainerCounts(containers: TInputData[], maxWeight: number): number[] {
    let currentCounts = new Array(containers.length).fill(0);
    let optimalCounts = new Array(containers.length).fill(0);
    let maxUtility = 0;

    function backtrack(index: number) {
        if (index === containers.length) {
            let totalUtility = calculateTotalUtility(containers, currentCounts);
            if (totalUtility > maxUtility && weightConstraintSatisfied(containers, currentCounts, maxWeight)) {
                maxUtility = totalUtility;
                optimalCounts = [...currentCounts];
            }
            return;
        }

        for (let count = 0; count * containers[index].weight <= maxWeight; count++) {
            currentCounts[index] = count;
            backtrack(index + 1);
        }
    }

    backtrack(0);
    return optimalCounts;
}



