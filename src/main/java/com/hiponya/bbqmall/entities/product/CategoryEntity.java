package com.hiponya.bbqmall.entities.product;

import java.util.Objects;

public class CategoryEntity {
    private int index;
    private String title;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CategoryEntity that = (CategoryEntity) o;
        return index == that.index;
    }

    @Override
    public int hashCode() {
        return Objects.hash(index);
    }

    public int getIndex() {
        return index;
    }

    public CategoryEntity setIndex(int index) {
        this.index = index;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public CategoryEntity setTitle(String title) {
        this.title = title;
        return this;
    }
}
