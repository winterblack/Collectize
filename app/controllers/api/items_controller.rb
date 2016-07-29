class Api::ItemsController < ApplicationController

  def create
    @item = Item.create!(item_params)
    render json: @item
  end

  def index
    collection_id = params[:organize][:collection_id]
    @items = Item.where(collection_id: collection_id).includes(:values)
    @items = sort_items(@items) unless params[:organize][:sort].empty?
    @items = filter_items(@items) unless params[:organize][:filter].empty?
  end

  def update
    @item = Item.find(params[:id])
    @item.update(item_params)
    render json: @item
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy
    render json: @item
  end

  private

  def item_params
    params.require(:item).permit(:title, :image_url, :collection_id)
  end

  def sort_items(items)
    direction = params[:organize][:order]
    characteristic_id = params[:organize][:sort]
    items = items.joins("inner join values sv on sv.item_id = items.id")
    if values_are_numbers?(characteristic_id)
      order = "cast(sv.value as int) #{direction}"
    else
      order = "sv.value #{direction}"
    end
    items.where(sv: {characteristic_id: params[:organize][:sort]})
         .order(order)
  end

  def filter_items(items)
    characteristic_id = params[:organize][:filter]
    items = items.joins("inner join values fv on fv.item_id = items.id")
                 .where(fv: {characteristic_id: characteristic_id})
    items = from(items, characteristic_id) unless params[:organize][:from].empty?
    items = to(items, characteristic_id) unless params[:organize][:to].empty?
    items
  end

  def values_are_numbers?(characteristic_id)
    Value.where(characteristic_id: characteristic_id)
         .map{|value| value.value}
         .all?{|value| value.to_i.to_s == value}
  end

  def from(items, characteristic_id)
    if values_are_numbers?(characteristic_id)
      there = "cast(fv.value as int) >= ?"
    else
      there = "fv.value >= ?"
    end
    items.where(there, params[:organize][:from])
  end

  def to(items, characteristic_id)
    if values_are_numbers?(characteristic_id)
      there = "cast(fv.value as int) <= ?"
    else
      there = "fv.value <= ?"
    end
    items = items.where(there, params[:organize][:to])
  end
end
